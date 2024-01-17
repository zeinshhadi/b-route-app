import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
  return (
    <View style={styles.chatScreenContainer}>
      <Text>Chat Screen</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatScreenContainer: {
    backgroundColor: "white",
  },
});
