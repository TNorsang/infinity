import { StyleSheet, View, Text, Platform } from "react-native";
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
    justifyContent: "center",
    alignItems: "center",
    width: Platform.OS === "web" ? wp(20) : wp(50),
    height: hp(7),
    borderRadius: hp(3.5),
    backgroundColor: "white",
    paddingHorizontal: wp(2),
    overflow: "hidden",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: hp(2),
    textAlign: "center",
  },
});
