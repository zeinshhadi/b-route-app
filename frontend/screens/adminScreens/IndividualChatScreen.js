import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { firebaseApp } from "../../config/firebase";
import { getDatabase, ref, push, serverTimestamp, query, orderByChild, equalTo } from "firebase/database";
import { onValue, off } from "firebase/database";

const IndividualChatScreen = ({ route }) => {
  const authState = useSelector((state) => state.auth);
  const adminId = authState.user.id;
  const { userId } = route.params;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebaseApp);

    const userChatRef = ref(db, `chat-messages/user-chats/${adminId}/${userId}`);

    const handleData = (snapshot) => {
      console.log("Received new data:", snapshot.val());
      if (snapshot.val()) {
        setMessages(Object.values(snapshot.val()));
      }
    };

    onValue(userChatRef, handleData);

    return () => off(userChatRef, "value", handleData);
  }, [adminId, userId]);

  const sendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    const senderId = adminId;
    const senderType = "admin";
    const senderFirstName = authState.user.first_name;

    // Use the correct reference path for user's chat
    const userChatRef = ref(getDatabase(firebaseApp), `chat-messages/user-chats/${userId}/${adminId}/messages`);

    // Generate a unique key for the new message
    const newMessageRef = push(userChatRef);

    // Get the unique key generated by push
    const messageId = newMessageRef.key;

    // Set the message data
    const messageData = {
      senderId,
      senderType,
      senderFirstName,
      message,
      timestamp: serverTimestamp(),
    };

    // Update the message under the generated key
    newMessageRef.set(messageData);

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => {
          if (item && item.timestamp && item.senderId) {
            return `${item.timestamp}-${item.senderId}`;
          }
          return `${index}`;
        }}
        renderItem={({ item }) => (
          <View key={`${item.timestamp}-${item.senderId}`} style={styles.messageContainer}>
            <Text style={styles.username}>{item.senderFirstName}:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  messageContainer: {
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});

export default IndividualChatScreen;
