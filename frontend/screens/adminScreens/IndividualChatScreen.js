import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, onValue, off, serverTimestamp } from "firebase/database";
import { firebaseApp } from "../../config/firebase";
const IndividualChatScreen = ({ route }) => {
  const authState = useSelector((state) => state.auth);
  const { userId, userType } = route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const chatMessagesRef = ref(db, `chat-messages/${userType}/admin/${userId}`);

    const handleData = (snapshot) => {
      console.log("Handling data in IndividualChatScreen:", snapshot.val());
      if (snapshot.val()) {
        const messagesList = Object.values(snapshot.val());
        setMessages(messagesList);
      }
    };

    onValue(chatMessagesRef, handleData);

    return () => off(chatMessagesRef, "value", handleData);
  }, [userId, userType]);

  const sendMessage = () => {
    console.log("Sending message...");

    if (message.trim() === "") {
      console.log("Message is empty");
      return;
    }

    const userMessagesRef = ref(getDatabase(), `chat-messages/${userType}/admin/${userId}`);
    push(userMessagesRef, {
      username: authState.user.first_name,
      message,
      userType: "admin",
      timestamp: serverTimestamp(),
      userId: authState.user.id,
    });

    setMessage("");
    console.log("Message sent!");
  };

  return (
    <View style={styles.individualChatScreenContainer}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.username}>{item.username}:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your reply..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  individualChatScreenContainer: {
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
