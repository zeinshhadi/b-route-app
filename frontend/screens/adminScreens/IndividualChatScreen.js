import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push, onValue, off, serverTimestamp } from "firebase/database";
import { firebaseApp } from "../../config/firebase";
import Colors from "../../utils/colors";
const IndividualChatScreen = ({ route }) => {
  const authState = useSelector((state) => state.auth);
  const { userId, userType } = route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const chatMessagesRef = ref(db, `chat-messages/${userType}/admin/${userId}`);

    const handleData = (snapshot) => {
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
          <View
            style={[
              styles.messageContainer,
              item.userId === authState.user.id ? null : styles.receivedMessageContainer,
            ]}>
            <Text style={item.userId === authState.user.id ? styles.username : styles.receivedUsername}>
              {item.username}:
            </Text>
            <Text style={item.userId === authState.user.id ? styles.messageText : styles.receivedMessageText}>
              {item.message}
            </Text>
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
        <Button color={Colors.primary500} title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default IndividualChatScreen;

const styles = StyleSheet.create({
  individualChatScreenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 5,
    borderRadius: 10,
    maxWidth: "80%",
    alignSelf: "flex-end",
    backgroundColor: Colors.primary600,
    marginHorizontal: 10,
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
  },
  sendButtonText: {
    color: "white",
  },
});
