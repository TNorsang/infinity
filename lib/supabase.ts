import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
// const { SUPABASE_URL, SUPABASE_ANON_KEY } = require("@env");

// const supabaseUrl = SUPABASE_URL;
// const supabaseAnonKey = SUPABASE_ANON_KEY;

const supabaseUrl = "https://rdpatnawswtewpvmecsa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcGF0bmF3c3d0ZXdwdm1lY3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTI0ODIsImV4cCI6MjA2Mjk4ODQ4Mn0.aT5YvtiIhBx3rt2gdw5Rb5TYW6wJ80gZ84ogJ5Lnocs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
