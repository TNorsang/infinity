import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import Account from "@/components/Account";
import { supabase } from "@/lib/supabase";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { Redirect } from "expo-router";

export default function index() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <ScreenWrapper>
      <View>
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Redirect href="/welcome" />
        )}
      </View>
    </ScreenWrapper>
  );
}
