import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Auth from "@/components/Auth";
import { useFonts } from "expo-font";
import { wp, hp } from "@/helpers/common";

export default function login() {
  const [slider_font] = useFonts({
    "SlacksideOne-Regular": require("@/assets/fonts/SlacksideOne-Regular.ttf"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>infinity</Text>
      </View>
      <View style={styles.signUpContainer}>
        <Auth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "SlacksideOne-Regular",
    fontSize: wp(20),
  },
});
