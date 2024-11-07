import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function CreatePost() {
  // Load the font
  const [fontsLoaded] = useFonts({
    "SlacksideOne-Regular": require("../../assets/fonts/SlacksideOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <Text style={styles.text}>infinity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SlacksideOne-Regular", // Use the loaded font
    fontSize: 24,
  },
});
