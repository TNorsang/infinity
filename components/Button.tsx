import { StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import { Href, useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";

interface ButtonProps {
  title: string;
  location?: Href<string | object>;
  style?: any;
  onPress?: () => void;
}

export default function Button(props: ButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={() => {
        props.onPress?.(); // Execute additional press actions if provided
        if (props.location) {
          router.push(props.location);
        } // Cast location to const to satisfy TypeScript
      }}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "web" ? wp(20) : wp(50),
    height: hp(7),
    borderRadius: hp(10),
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 5,
    paddingHorizontal: wp(2),

    // Drop Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: hp(2),
    textAlign: "center",
  },
});
