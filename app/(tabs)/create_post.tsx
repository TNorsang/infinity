import ScreenWrapper from "@/components/ScreenWrapper";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { User } from "@supabase/supabase-js";

export default function CreatePost() {
  const [media, setMedia] = useState<null | Asset>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetch_user = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetch_user();
  }, []);

  const pickMedia = () => {
    launchImageLibrary({ mediaType: "mixed" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled media picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setMedia(response.assets[0]); // Assuming we want the first selected asset
      } else {
        console.log("No assets selected");
      }
    });
  };

  const handlePost = async () => {
    try {
      console.log("Starting handlePost function...");
      if (!user) {
        Alert.alert("User information is not available. Please log in again.");
        return;
      }

      if (!text && !media) {
        Alert.alert("Please add text or media to post.");
        return;
      }

      // Step 1: Upload Media to Supabase Storage (if there is any)
      let mediaUrl = null;

      if (media) {
        if (!media.uri) {
          throw new Error("Invalid media file: Missing URI");
        }

        // Handle undefined fileName
        const fileName = media.fileName || `upload_${Date.now()}`;
        const ext = fileName.split(".").pop();

        if (!ext) {
          throw new Error("Invalid file name");
        }

        const filePath = `${user.id}/${Date.now()}.${ext}`;

        console.log("Uploading media to Supabase...");
        // Fetch the file as a Blob
        const response = await fetch(media.uri);
        const blob = await response.blob();

        // Upload the media file as a Blob
        const { error: uploadError } = await supabase.storage
          .from("post-media") // Replace with your Supabase bucket name
          .upload(filePath, blob);

        if (uploadError) {
          throw uploadError;
        }

        console.log("Getting public URL for the uploaded media...");
        const { data } = supabase.storage
          .from("post-media")
          .getPublicUrl(filePath);

        if (!data) {
          throw new Error("Failed to get public URL of the uploaded media");
        }

        mediaUrl = data.publicUrl;
      }

      console.log("Inserting post into Supabase...");
      // Step 2: Insert a New Post into the Supabase Database
      const { error: insertError } = await supabase.from("posts").insert([
        {
          user_id: user.id,
          content: text,
          media_urls: mediaUrl,
        },
      ]);

      if (insertError) {
        throw insertError;
      }
      Alert.alert("Posted successfully!");
      setText(""); // Clear input
      setMedia(null); // Clear selected media
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error occurred:", error.message);
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ScreenWrapper>
      <View className="items-center">
        <Text style={styles.text}>Create Post</Text>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      {/* Media Picker Button */}
      <TouchableOpacity onPress={pickMedia} style={styles.mediaPicker}>
        <Text>{media ? "Change Media" : "Add Photo/Video"}</Text>
      </TouchableOpacity>

      {/* Display Selected Media */}
      {media && (
        <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
      )}

      {/* Post Button */}
      <Button title="Post" onPress={handlePost} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  mediaPicker: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  mediaPreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
