import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";
import { Icon } from "@rneui/themed";

interface postProps {
  account: string;
  content: string;
  avatarUrl?: string;
  imageUrl?: string;
}

const Post: React.FC<postProps> = ({
  account,
  content,
  avatarUrl,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      {/* Header: Avatar and Username */}
      <View style={styles.header}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <Icon name="user-circle" type="font-awesome" size={36} color="#bbb" />
        )}
        <Text style={styles.account}>{account}</Text>
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Icon name="more-vert" type="material" color="#444" />
        </TouchableOpacity>
      </View>
      {/* Post Image */}
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: imageUrl }}
            style={styles.postImage}
          />
        </View>
      )}

      {/* Post Content */}
      <Text style={styles.text}>{content}</Text>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity>
          <Icon name="heart-o" type="font-awesome" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Icon name="comment-o" type="font-awesome" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Icon
            name="paper-plane-o"
            type="font-awesome"
            size={24}
            color="#222"
          />
        </TouchableOpacity>
      </View>
      {/* Content */}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: wp(70),
    borderRadius: 18,
    marginVertical: hp(2),
    marginHorizontal: wp(2),
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignSelf: "flex-start",
    flexGrow: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  account: {
    color: "#222",
    fontWeight: "700",
    fontSize: wp(2),
    marginLeft: 10,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: undefined,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  text: {
    color: "#222",
    fontWeight: "400",
    fontSize: wp(1.5),
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
