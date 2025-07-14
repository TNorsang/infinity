import { SafeAreaView, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Auth from "@/components/Auth"; // Assuming this is the login/signup component
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);

      if (session) {
        router.replace("/"); // <-- This should be your home page route
      }
    });

    // Listen for session changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          router.replace("/"); // <-- Home page route
        }
      }
    );
  }, []);

  // Load custom font
  const [fontsLoaded] = useFonts({
    "SlacksideOne-Regular": require("@/assets/fonts/SlacksideOne-Regular.ttf"),
  });

  // Wait until fonts are loaded and session state is determined
  if (!fontsLoaded || isLoading) {
    return null; // Render nothing while waiting for fonts and session info
  }

  // Render the Auth component only if there is no session
  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <View>{!session && <Auth />}</View>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
