import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CreatePost() {
  return (
    <View>
      <Text style={styles.text}>Create Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});
