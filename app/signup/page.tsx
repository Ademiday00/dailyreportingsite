"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ SIGN UP USER
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://dailyreportingsite-a86o.vercel.app/home", // ✅ fixed
        },
      });

      if (authError) throw authError;

      const user = data.user;

      if (!user) throw new Error("User creation failed");

      // 2️⃣ INSERT PROFILE (VERY IMPORTANT)
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
        });

      if (profileError) throw profileError;

      // 3️⃣ REDIRECT
      router.push("/home");

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg font-sans">
      <div className="h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          <div className="mb-6">
            <label className="block font-bold mb-2">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full border rounded-md px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block font-serif font-bold mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full border rounded-md px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block font-serif font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block font-serif font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-800 text-white font-bold font-serif py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}