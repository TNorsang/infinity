import { StyleSheet, View, Text, Platform } from "react-native";
import { Link } from "expo-router";
import { hp, wp } from "../helpers/common";

export default function Button(props) {
  return (
    <Link href={props.location}>
      <View style={[styles.button, props.style]}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </Link>
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
