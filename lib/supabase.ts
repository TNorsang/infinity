// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

// Determine the right storage implementation:
let storageImplementation: {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

if (Platform.OS === "web" && typeof window !== "undefined") {
  // 1) Browser *client‑side* → use localStorage
  storageImplementation = {
    getItem: (k) => Promise.resolve(window.localStorage.getItem(k)),
    setItem: (k, v) => Promise.resolve(window.localStorage.setItem(k, v)),
    removeItem: (k) => Promise.resolve(window.localStorage.removeItem(k)),
  };
} else if (typeof window === "undefined") {
  // 2) SSR / Node (no window) → no‑op stub
  storageImplementation = {
    getItem: (_) => Promise.resolve(null),
    setItem: (_, __) => Promise.resolve(),
    removeItem: (_) => Promise.resolve(),
  };
} else {
  // 3) React Native (iOS / Android) → real AsyncStorage
  //    loaded lazily so it never bundles into web/SSR
  // @ts-ignore
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  storageImplementation = AsyncStorage;
}

// Now create your client:
export const supabase = createClient(
  "https://rdpatnawswtewpvmecsa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…aT5YvtiIhBx3rt2gdw5Rb5TYW6wJ80gZ84ogJ5Lnocs",
  {
    auth: {
      storage: storageImplementation,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
