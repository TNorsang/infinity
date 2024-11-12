import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
// const { SUPABASE_URL, SUPABASE_ANON_KEY } = require("@env");

// const supabaseUrl = SUPABASE_URL;
// const supabaseAnonKey = SUPABASE_ANON_KEY;

const supabaseUrl = "https://tpoydegwwgerzgjskxbh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwb3lkZWd3d2dlcnpnanNreGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzIxMDMsImV4cCI6MjA0Njc0ODEwM30.PmWnvfDz2UdzchseF3jy7QxPuWU9rFae3UorhY8_00A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
