import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { firebaseApp } from "../../config/firebase";
import Colors from "../../utils/colors";

const AdminChatScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const db = getDatabase(firebaseApp);
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
              timestamp: lastMessage.timestamp,
            };
          });
        });

        const sortedUsers = userList.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp);

        console.log("User List:", sortedUsers);

        setUsers(sortedUsers);
        setLoading(false);
      } else {
        setLoading(false);
        setUsers([]);
      }
    };

    onValue(chatMessagesRef, handleData);
    setLoading(false);
    return () => off(chatMessagesRef, "value", handleData);
  }, []);

  const navigateToChat = (userId, userType) => {
    navigation.navigate("IndividualChatScreen", { userId, userType });
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => navigateToChat(item.userId, item.userType)}
          android_ripple={{ color: Colors.primary500 }}
          style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
          <View style={styles.userCard}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.adminChatScreenContainer}>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.primary500}
          style={{
            alignSelf: "center",
            flex: 1,
          }}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item, index) => `${item.userId}_${item.userType}_${index}`}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default AdminChatScreen;

const styles = StyleSheet.create({
  adminChatScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    marginTop: 5,
  },
  userCard: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: Colors.cardColor,
    width: "100%",
    alignSelf: "center",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: "grey",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 5,
    height: "100%",
    width: "90%",
    alignSelf: "center",
  },
  buttonPressed: {
    opacity: 0.5,
    overflow: "hidden",
  },
});
