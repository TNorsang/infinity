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
        id,
        content,
        media_urls,
        user_id,
        users: user_id (
          username: user_metadata->>username,
          avatar_url: user_metadata->>avatar_url,
          email
        )
      `
      )
      .order("id", { ascending: false });
    if (data) {
      setPosts(
        data.map((item: any) => ({
          id: item.id,
          account: item.users?.username || item.users?.email || "User",
          content: item.content,
          media_urls: item.media_urls,
          avatarUrl: item.users?.avatar_url,
        }))
      );
    }
    setRefreshing(false);
  };

  const renderItem: ListRenderItem<ItemData> = ({ item }) => (
    <View style={styles.postContainer}>
      <Post
        account={item.account}
        content={item.content}
        imageUrl={item.media_urls}
        avatarUrl={item.avatarUrl}
      />
    </View>
  );

  const onRefresh = useCallback(() => {
    fetchPosts();
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
