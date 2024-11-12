import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "@/components/Post";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface ItemData {
  id: string;
  account: string;
  content: string;
}

const DATA: ItemData[] = [
  { id: "1", account: "Pala", content: "Dear" },
  { id: "2", account: "Norsang", content: "I'm Hungry!" },
  { id: "3", account: "Dolores", content: "I'm getting sued!" },
  { id: "4", account: "Amala", content: "I'm not materialistic!" },
];

export default function Feed() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // await fetchUserPost();
      }
    };
    fetchUser();
  }, []);

  // async function fetchUserPost(){
  //   try{
  //     const {data, error, status} = await supabase.from("posts").select()
  //   }
  // }
  const renderItem: ListRenderItem<ItemData> = ({ item }) => (
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
