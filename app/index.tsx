import { Text, View, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import "@/styles/globals.css";

const index = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <Text>infinity app</Text>
      <Button title="Welcome Page" onPress={() => router.push("welcome")} />
    </ScreenWrapper>
  );
};

export default index;
