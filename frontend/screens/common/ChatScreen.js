import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { firebaseApp } from "../../config/firebase";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { onValue, off } from "firebase/database";

const ChatScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = authState.user.first_name;
  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const messagesRef = ref(db, "chat-messages");

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        setMessages(Object.values(snapshot.val()));
      }
    };

    onValue(messagesRef, handleData);

    return () => off(messagesRef, "value", handleData);
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    const username = authState.user.first_name;

    const messagesRef = ref(getDatabase(firebaseApp), "chat-messages");
    push(messagesRef, {
      username,
      message,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <View style={styles.chatScreenContainer}>
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
