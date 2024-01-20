import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, serverTimestamp, onValue, off } from "firebase/database";

const IndividualChatScreen = ({ route }) => {
  const authState = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId, userType } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chat-messages/${userType}s/admin/${userId}`);

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        const messagesList = Object.values(snapshot.val());
        setMessages(messagesList);
      }
    };

    onValue(messagesRef, handleData);

    return () => off(messagesRef, "value", handleData);
  }, [userType, userId]);

  const sendMessage = () => {
    if (message.trim() === "") {
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
  };

  return (
    <View style={styles.container}>
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
