import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Auth from "@/components/Auth";
import { useFonts } from "expo-font";
import { wp, hp } from "@/helpers/common";
import { Session } from "@supabase/supabase-js";
import Account from "@/components/Account";
import { supabase } from "@/lib/supabase";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Redirect } from "expo-router";

export default function login() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  const [slider_font] = useFonts({
    "SlacksideOne-Regular": require("@/assets/fonts/SlacksideOne-Regular.ttf"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
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
