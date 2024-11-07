import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import Post from "../../components/Post";

const DATA = [
  { id: "1", account: "Pala", content: "Dear" },
  { id: "2", account: "Norsang", content: "I'm Hungry!" },
  { id: "3", account: "Dolores", content: "I'm getting sued!" },
  { id: "4", account: "Amala", content: "I'm not materialistic!" },
];

export default function Feed() {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Post account={item.account} content={item.content} />
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
