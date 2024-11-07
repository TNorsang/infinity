import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import Post from "../../components/Post";

const DATA = [
  { id: "1", content: "Beautiful Trip" },
  { id: "2", content: "TV TIME!" },
  { id: "3", content: "Love you guys!" },
  { id: "4", content: "Can't wait for thanks giving!" },
];

export default function Feed() {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Post content={item.content} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    overflow: "hidden",
  },

  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    alignItems: "center",
  },
});
