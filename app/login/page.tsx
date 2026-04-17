// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false); // ✅ NEW

//   const handleLogin = async () => {
//     if (loading) return; // 🚫 stop multiple clicks
//     setLoading(true);
//     setError(null);

//     const { error: loginError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (loginError) {
//       setError(loginError.message);
//       setLoading(false);
//       return;
//     }

//     router.push("/home");
//   };

//   return (
//     <div className="bg">
//       <div className="h-screen flex items-center justify-center">
//         <div className="p-8 rounded-lg shadow-lg w-full max-w-sm">
//           {error && <p className="text-red-600 mb-4">{error}</p>}

//           <input
//             type="email"
//             placeholder="Email"
//             className="mb-4 w-full border rounded-md px-4 py-2"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="mb-4 w-full border rounded-md px-4 py-2"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* ✅ THIS IS THE BUTTON YOU UPDATE */}
//           <button
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Not registered?{" "}
            
//             <span
//               className="text-blue-600 font-bold hover:underline cursor-pointer"
//               onClick={() => router.push("/signup")}
//             >
//               Sign Up
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ NEW
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
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

          {/* EMAIL */}
          <label className="block font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full border rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD WITH TOGGLE */}
           <label className="block font-bold mb-2">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // ✅ TOGGLE
              placeholder="Password"
              className="w-full border rounded-md px-4 py-2 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 👁 TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-600"
            >
             {showPassword ? (
    // Eye Slash (hidden)
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M2 2l20 20-1.5 1.5-3.2-3.2C15.8 21 14 21.5 12 21.5c-7 0-11-7-11-7 1.5-2.5 3.5-4.5 5.7-5.9L.5 3.5 2 2z"/>
    </svg>
  ) : (
    // Open Eye (visible)
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
    </svg>
  )}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* SIGN UP */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Not registered?{" "}
            <span
              className="text-blue-600 font-bold hover:underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </span>
          </p>
<p
  className="text-sm text-blue-600 cursor-pointer mb-3 text-center font-bold"
  onClick={() => router.push("/forgotpassword")}
>
  Forgot Password?
</p>
        </div>
        
      </div>
      
    </div>
  );
}