import { StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { supabase } from "@/lib/supabase"; // Import Supabase

SplashScreen.preventAutoHideAsync();

const Welcome = () => {
  const [slider_font] = useFonts({
    "SlacksideOne-Regular": require("@/assets/fonts/SlacksideOne-Regular.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      if (slider_font) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [slider_font]);

  if (!appIsReady) {
    return null;
  }

  // Function to handle button click
  const handleGetStarted = async () => {
    // Check if session exists
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      // If session exists, go to profile
      router.push("/(tabs)/profile");
    } else {
      // If no session, go to login
      router.push("/login/login");
    }
  };

  return (
    <View style={styles.container}>
      {/* Upper half without gradient */}
      <View style={styles.upperHalf} className="z-20">
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/family_transparent.png")}
        />
        {/* Title */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>infinity</Text>
          <Text style={styles.punchline}>
            Together in heart, connected from anywhere
          </Text>
        </View>
      </View>

      {/* Bottom half with gradient */}
      <LinearGradient
        className="z-10"
        colors={[
          "rgba(255, 246, 229, 0)", // Light orange with 0% opacity (transparent)
          "rgba(255, 209, 209, 0.6)",
          "rgba(255, 246, 229, 0.4)",
        ]}
        style={styles.gradient}
      ></LinearGradient>
      {/* Button */}
      <Button
        title="Get Started"
        style={styles.button}
        onPress={handleGetStarted} // Set the button click handler to check session
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  upperHalf: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    height: "70%", // Cover the bottom half of the screen
    width: "500%",
    position: "absolute",
    bottom: 0, // Position it at the bottom of the screen
  },
  welcomeImage: {
    height: hp(30),
    width: hp(30),
    alignSelf: "center",
    marginTop: 80,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    color: theme.colors.text,
    position: "relative",
    bottom: 50,
    marginTop: hp(10),
    fontFamily: "SlacksideOne-Regular",
    fontSize: hp(6),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold as "800",
  },
  punchline: {
    textAlign: "center",
    position: "relative",
    bottom: 60,
    marginTop: hp(2),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  button: {
    marginBottom: 100,
    zIndex: 20,
  },
});
