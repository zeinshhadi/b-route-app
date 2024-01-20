import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const AdminChatScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const adminMessagesRef = ref(db, `admin-messages/admin`);

    const handleData = (snapshot) => {
      console.log("Handling data in AdminChatScreen:", snapshot.val());

      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Data from Firebase:", data);

        const userList = Object.keys(data).flatMap((userType) => {
          const userChat = data[userType];

          if (typeof userChat === "object") {
            return Object.keys(userChat).map((userId) => {
              const messages = userChat[userId];
              const lastMessageKey = Object.keys(messages)[Object.keys(messages).length - 1];
              const lastMessage = messages[lastMessageKey];

              return {
                userId,
                userType,
                username: lastMessage.username,
                lastMessage: lastMessage.message,
              };
            });
          }

          return [];
        });

        console.log("User List:", userList);

        setUsers(userList);
      } else {
        setUsers([]);
      }
    };

    onValue(adminMessagesRef, handleData);

    return () => off(adminMessagesRef, "value", handleData);
  }, []);

  const navigateToChat = (userId, userType) => {
    navigation.navigate("Chat", { userId, userType });
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
