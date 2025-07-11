import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { Button, Input, Icon } from "@rneui/themed";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user session when component mounts
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        await getProfile(user.id);
      }
    };
    fetchUser();
  }, []);

  async function getProfile(userId: string) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user found!");

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  interface data_type {
    username: string;
    website: string;
    avatar_url: string;
  }
  async function updateProfile({ username, website, avatar_url }: data_type) {
    try {
      setLoading(true);
      setFeedback(null);
      if (!user) throw new Error("No user found!");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
      setFeedback("Profile updated!");
    } catch (error) {
      if (error instanceof Error) {
        setFeedback(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          alignSelf: "center",
        }}
      >
        Account
      </Text>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
          />
        ) : (
          <Icon name="user-circle" type="font-awesome" size={80} color="#ccc" />
        )}
      </View>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginBottom: 16 }}
        />
      )}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={user?.email || ""} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Website"
          value={website || ""}
          onChangeText={setWebsite}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? <ActivityIndicator color="#fff" /> : "Update"}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={async () => {
            await supabase.auth.signOut();
            router.push("/welcome");
          }}
        />
      </View>
      {feedback && (
        <Text
          style={{
            color: feedback.includes("Error") ? "red" : "green",
            marginTop: 16,
            alignSelf: "center",
          }}
        >
          {feedback}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
