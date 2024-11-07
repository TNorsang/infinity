import { StyleSheet, View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { hp, wp } from "../helpers/common";

export default function Button(props) {
  return (
    <View style={[styles.button, props.style]}>
      <Link href={props.location}>
        <Text style={styles.text}>{props.title}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    width: wp(20),
    height: hp(8),
    borderRadius: 40,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: hp(2),
    textAlign: "center",
  },
});
