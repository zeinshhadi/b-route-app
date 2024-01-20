import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, serverTimestamp, onValue, off } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
const ChatScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = authState.user.id;
  const userType = authState.user.role_type;
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chat-messages/${userType}s/admin/${userId}`);

    const handleData = (snapshot) => {
      console.log("Handling data in ChatScreen:", snapshot.val());
      if (snapshot.val()) {
        const messagesList = Object.values(snapshot.val());

        setMessages(messagesList);
      }
    };

    onValue(messagesRef, handleData);

    return () => off(messagesRef, "value", handleData);
  }, [userType, userId]);

  const sendMessage = () => {
    console.log("Sending message...");

    if (message.trim() === "") {
      console.log("Message is empty");
      return;
    }

    const userMessagesRef = ref(getDatabase(), `chat-messages/${userType}s/admin/${userId}`);
    push(userMessagesRef, {
      username: authState.user.first_name,
      message,
      userType,
      timestamp: serverTimestamp(),
      userId,
    });

    setMessage("");
    console.log("Message sent!");
  };
  return (
    <View style={styles.chatScreenContainer}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.username}>{item.userType === "admin" ? "Admin" : "User"}:</Text>
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

export default ChatScreen;

const styles = StyleSheet.create({
  chatScreenContainer: {
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
