import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const AdminChatScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("AdminChatScreen rendering...");
    console.log("Role Type:", authState.user.role_type);

    const db = getDatabase();
    const adminMessagesRef = ref(db, `admin-messages`);

    const handleData = (snapshot) => {
      console.log("Handling data in AdminChatScreen:", snapshot.val());
      console.log(snapshot.exists());

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extract chat data from the object
        const chatList = Object.keys(data)
          .map((userType) => {
            const userChat = data[userType];

            if (typeof userChat === "object") {
              // Get the last message key for each user
              const lastMessageKey = Object.keys(userChat)[Object.keys(userChat).length - 1];

              // Extract the last message
              const lastMessage = userChat[lastMessageKey];

              // Return the formatted chat object
              return {
                ...lastMessage,
                userType,
              };
            }

            return null; // Skip non-object entries
          })
          .filter(Boolean); // Remove null entries

        setChats(chatList);
      } else {
        console.log("No admin messages found.");
        setChats([]);
      }
    };

    onValue(adminMessagesRef, handleData);

    return () => off(adminMessagesRef, "value", handleData);
  }, [authState.user.role_type]);

  const navigateToChat = (userId, userType) => {
    navigation.navigate("Chat", { userId, userType });
  };

  const getChatTitle = (userType) => {
    if (userType === "driver") {
      return "Driver";
    } else if (userType === "passenger") {
      return "Passenger";
    } else {
      return "Unknown";
    }
  };

  return (
    <View style={styles.adminChatScreenContainer}>
      <FlatList
        data={chats}
        keyExtractor={(item) => `${item.timestamp}_${item.userType}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item.userId, item.userType)}>
            <View style={styles.chatContainer}>
              <Text style={styles.username}>{getChatTitle(item.userType)}:</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
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
  chatContainer: {
    flexDirection: "row",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
  },
  messageText: {
    flex: 1,
  },
});

export default AdminChatScreen;
