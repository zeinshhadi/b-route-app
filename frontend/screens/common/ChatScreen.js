import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, serverTimestamp, onValue, off } from "firebase/database";
import { firebaseApp } from "../../config/firebase";
import Colors from "../../utils/colors";

const ChatScreen = () => {
  const authState = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = authState.user.id;
  const userType = authState.user.role_type;

  useEffect(() => {
    const db = getDatabase(firebaseApp);
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
  const renderItem = ({ item }) => {
    return (
      <View
        style={[styles.messageContainer, item.userId === authState.user.id ? null : styles.receivedMessageContainer]}>
        <Text style={item.userId === authState.user.id ? styles.username : styles.receivedUsername}>
          {item.username}:
        </Text>
        <Text style={item.userId === authState.user.id ? styles.messageText : styles.receivedMessageText}>
          {item.message}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.chatScreenContainer}>
      <FlatList data={messages} keyExtractor={(item) => item.timestamp.toString()} renderItem={renderItem} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message..."
        />
        <Button color={Colors.primary500} title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatScreenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 5,
    borderRadius: 10,
    minWidth: "30%",
    maxWidth: "80%",
    alignSelf: "flex-end",
    backgroundColor: Colors.primary600,
    margin: 10,
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: Colors.cardColor,
    marginHorizontal: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
    color: "white",
  },
  receivedUsername: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
  messageText: {
    color: "white",
    fontSize: 15,
  },
  receivedMessageText: {
    color: "black",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 25,
    padding: 8,
    backgroundColor: "white",
    color: "black",
  },
  sendButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
  },
  sendButtonText: {
    color: "white",
  },
});
