import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function CreatePost() {
  return (
    <ScreenWrapper>
      <View>
        <Text style={styles.text}>Create Post</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});
