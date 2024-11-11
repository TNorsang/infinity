import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";
import { User } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null); // Correct type for user state
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        await fetchUserProfile(user.id);
      }
    }
    fetchUser();
  }, []); // Add empty dependency array to ensure it only runs once

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .single();
      if (error && status !== 400) {
        throw error;
      }
      if (data) {
        setUserName(data.username);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <ScreenWrapper>
      <View>
        <Text>Welcome, {userName}</Text>
      </View>
      <View>
        <Button title={"Settings"} location={"/settings/settings"} />
      </View>
    </ScreenWrapper>
  );
}
