"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ✅ NEW

  const handleLogin = async () => {
    if (loading) return; // 🚫 stop multiple clicks
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push("/home");
  };

  return (
    <div className="bg">
      <div className="h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full border rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full border rounded-md px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ THIS IS THE BUTTON YOU UPDATE */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Not registered?{" "}
            
            <span
              className="text-blue-600 font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}