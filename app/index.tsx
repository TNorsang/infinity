import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import Account from "@/components/Account";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/supabase";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { Redirect } from "expo-router";

export default function index() {
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
