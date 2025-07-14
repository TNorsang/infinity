import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Platform,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"; // Import Text
import { supabase } from "@/lib/supabase";
import { Button, Input, Icon } from "@rneui/themed";
import { wp, hp } from "@/helpers/common";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  async function signInWithEmail() {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) setMessage(error.message);
    else setMessage("Signed in!");
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    // Insert into profiles table if sign up succeeded
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id, // Use the uuid from Supabase Auth
        email: email,
        username: username,
      });
      if (profileError) {
        setMessage("Sign up succeeded, but failed to save username.");
        setLoading(false);
        return;
      }
    }
    setMessage("Check your email for confirmation!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 24,
          alignSelf: "center",
        }}
      >
        Welcome
      </Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Username"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={setUsername}
          value={username}
          placeholder="Choose a username"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
          placeholder="Password"
          autoCapitalize="none"
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Icon
                name={showPassword ? "eye-slash" : "eye"}
                type="font-awesome"
              />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.titleStyle}
          title={loading ? <ActivityIndicator color="black" /> : "Sign in"}
          disabled={loading || !email || !password}
          onPress={signInWithEmail}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.titleStyle}
          title={loading ? <ActivityIndicator color="black" /> : "Sign up"}
          disabled={loading || !email || !password}
          onPress={signUpWithEmail}
        />
      </View>
      {message && (
        <Text
          style={{
            color: message.includes("Error") ? "red" : "green",
            marginTop: 16,
            alignSelf: "center",
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    width: wp(80),
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "web" ? wp(20) : wp(50),
    height: hp(7),
    borderRadius: hp(10),
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 3,
    paddingHorizontal: wp(2),

    // Drop Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  buttonContainer: {
    width: Platform.OS === "web" ? wp(20) : wp(50),
    alignSelf: "center",
  },
  titleStyle: {
    color: "black",
    fontWeight: "bold",
  },
});
