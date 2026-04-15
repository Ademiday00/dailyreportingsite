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
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full border rounded-md px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD WITH TOGGLE */}
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
              {showPassword ? "🙈" : "👁"}
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