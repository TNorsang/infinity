import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";

interface postProps {
  account: string;
  content: string;
}
const Post: React.FC<postProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.account}>{props.account}</Text>
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
    alignItems: "center",
    borderRadius: 30,
    padding: 10,
  },
  accountContainer: {
    marginBottom: 10,
  },
  account: {
    color: "white", // Text color for the account name
    fontWeight: "800",
    fontSize: wp(4), // Adjust font size if needed
  },
  text: {
    color: "gray",
    fontWeight: "600",
    fontSize: wp(2),
  },
});
