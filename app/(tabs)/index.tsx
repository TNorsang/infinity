import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Post from "@/components/Post";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface ItemData {
  id: string;
  username: string;
  account: string;
  content: string;
  media_urls?: string;
  avatarUrl?: string;
}

export default function Feed() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<ItemData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        profiles (
          username,
          avatar_url
        )
      `
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.log("Supabase fetch error:", error);
    }
    if (data) {
      setPosts(
        data.map((item: any) => ({
          id: item.id,
          username: item.profiles?.username || "User",
          account: item.profiles?.username || "User",
          content: item.content,
          media_urls: item.media_urls,
          avatarUrl: item.profiles?.avatar_url,
        }))
      );
    }
    setRefreshing(false);
  };

  const renderItem: ListRenderItem<ItemData> = ({ item }) => (
    <View style={styles.postContainer}>
      <Post
        account={item.username || "User"}
        content={item.content}
        imageUrl={item.media_urls}
        avatarUrl={item.avatarUrl}
      />
    </View>
  );

  const onRefresh = useCallback(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          fetchPosts(); // Or update posts state directly
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            No posts yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 0,
  },
  postContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
  },
});
