import { Text, View, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { Redirect } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <Redirect href="/welcome" />
    </ScreenWrapper>
  );
};

export default index;
