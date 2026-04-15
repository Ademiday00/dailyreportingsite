"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁️ NEW: toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setMessage("Invalid or expired reset link");
      }
    };

    checkSession();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully ✅");

    setTimeout(() => {
      router.push("/login");
    }, 2000);

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-center text-black">
          Reset Password
        </h2>

        {/* PASSWORD FIELD WITH EYE TOGGLE */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full border p-2 pr-10 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 👁️ TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-black"
          >
            {showPassword ? "x" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-blue-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}