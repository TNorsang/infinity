import { StyleSheet, Text, View, Platform, Image } from "react-native";
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
      <View>
        <Image
          resizeMode="contain"
          source={require("@/assets/images/post_image_one.png")}
        />
        <Text style={styles.text}>{props.content}</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: wp(80),
    height: hp(30),
    marginVertical: hp(5),
    marginHorizontal: wp(4),
    borderRadius: 30,
    padding: 10,
  },
  accountContainer: {
    marginBottom: 10,
  },
  account: {
    color: "black", // Text color for the account name
    fontWeight: "800",
    fontSize: Platform.OS === "web" ? wp(1.5) : wp(5.5),
  },
  text: {
    color: "gray",
    fontWeight: "400",
    fontSize: wp(1),
  },
});
