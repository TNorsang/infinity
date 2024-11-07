import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";

const Post = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Account</Text>
      </View>
      <Text style={styles.text}>{props.content}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    width: wp(80),
    height: hp(30),
    marginVertical: hp(5),
    marginHorizontal: wp(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: wp(2),
  },
});
