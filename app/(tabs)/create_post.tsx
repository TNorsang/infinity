import ScreenWrapper from "@/components/ScreenWrapper";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { User } from "@supabase/supabase-js";
import { Icon } from "@rneui/themed";
import { useRouter } from "expo-router";

export default function CreatePost() {
  const [media, setMedia] = useState<null | Asset>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetch_user = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetch_user();
  }, []);

  const pickMedia = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // User cancelled
      } else if (response.errorMessage) {
        Alert.alert("ImagePicker Error", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setMedia(response.assets[0]);
      }
    });
  };

  const handlePost = async () => {
    try {
      if (!user) {
        Alert.alert("User information is not available. Please log in again.");
        return;
      }
      if (!text && !media) {
        Alert.alert("Please add text or media to post.");
        return;
      }
      setLoading(true);

      let mediaUrl = null;
      if (media) {
        if (!media.uri) throw new Error("Invalid media file: Missing URI");
        const fileName = media.fileName || `upload_${Date.now()}`;
        const ext = fileName.split(".").pop();
        if (!ext) throw new Error("Invalid file name");
        const filePath = `${user.id}/${Date.now()}.${ext}`;
        const response = await fetch(media.uri);
        const blob = await response.blob();
        const { error: uploadError } = await supabase.storage
          .from("post-media")
          .upload(filePath, blob);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage
          .from("post-media")
          .getPublicUrl(filePath);
        if (!data)
          throw new Error("Failed to get public URL of the uploaded media");
        mediaUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          content: text,
          media_urls: mediaUrl,
          username: user.user_metadata?.username || user.email,
        },
      ]);
      if (insertError) throw insertError;
      Alert.alert("Posted successfully!");
      setText("");
      setMedia(null);
      router.replace("/"); // Navigate to feed and trigger refresh
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.headerRow}>
        {user?.user_metadata?.avatar_url ? (
          <Image
            source={{ uri: user.user_metadata.avatar_url }}
            style={styles.avatar}
          />
        ) : (
          <Icon name="user-circle" type="font-awesome" size={40} color="#bbb" />
        )}
        <Text style={styles.username}>
          {user?.user_metadata?.username || user?.email || "User"}
        </Text>
      </View>
      <TextInput
        placeholder="Write a caption..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
        maxLength={2200}
      />
      {media && (
        <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
      )}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.mediaPicker} onPress={pickMedia}>
          <Icon name="image" type="feather" color="#007bff" size={22} />
          <Text style={styles.mediaPickerText}>
            {media ? "Change Photo" : "Add Photo"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shareButton, loading && { opacity: 0.7 }]}
          onPress={handlePost}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.shareButtonText}>Share</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  input: {
    minHeight: 80,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 12,
    backgroundColor: "#fafafa",
    textAlignVertical: "top",
  },
  mediaPreview: {
    width: "92%",
    aspectRatio: 1,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginTop: 8,
  },
  mediaPicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf1fb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  mediaPickerText: {
    color: "#007bff",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 15,
  },
  shareButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
