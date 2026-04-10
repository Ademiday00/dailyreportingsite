import { supabase } from "@/lib/supabaseClient";

export async function fetchProfile() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .maybeSingle(); // ✅ FIX HERE

  if (error) {
    console.error("Profile fetch error:", error.message);
    return null;
  }

  return data;
}