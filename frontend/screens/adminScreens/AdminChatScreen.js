import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";

const AdminChatScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const chatMessagesRef = ref(db, "chat-messages");

    const handleData = (snapshot) => {
      console.log("Handling data in AdminChatScreen:", snapshot.val());

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Data from Firebase:", data);

        const userList = Object.keys(data).flatMap((userType) => {
          const users = data[userType]["admin"];
          if (!users) return null;

          return Object.keys(users).flatMap((userId) => {
            const messages = users[userId];
            if (!messages) return null;

            const lastMessageKey = Object.keys(messages)[Object.keys(messages).length - 1];
            const lastMessage = messages[lastMessageKey];

            return {
              userId,
              userType,
              username: lastMessage.username,
              lastMessage: lastMessage.message,
            };
          });
        });

        console.log("User List:", userList);

        setUsers(userList.filter(Boolean));
      } else {
        setUsers([]);
      }
    };

    onValue(chatMessagesRef, handleData);

    return () => off(chatMessagesRef, "value", handleData);
  }, []);

  const navigateToChat = (userId, userType) => {
    navigation.navigate("IndividualChatScreen", { userId, userType });
  };

  return (
    <View style={styles.adminChatScreenContainer}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.userId}_${item.userType}_${index}`}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigateToChat(item.userId, item.userType)}>
            <View style={styles.userCard}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adminChatScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  userCard: {
    flexDirection: "column",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    marginTop: 5,
    color: "black",
  },
});

export default AdminChatScreen;
