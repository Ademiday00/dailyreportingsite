"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AttendanceSession = {
  id?: string;
  user_id?: string;
  date: string;
  login_time: string;
  logout_time: string | null;
  location: string | null;
  logout_location?: string | null;
  total_time: number;
  technician_name: string;
  is_active?: boolean;
};

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceSession[]>([]);
  const [currentSession, setCurrentSession] =
    useState<AttendanceSession | null>(null);

  const [location, setLocation] = useState<string | null>(null);
  const [technicianName, setTechnicianName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [liveTime, setLiveTime] = useState("00:00:00");

  // ================= GET USER =================
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) return;

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        setTechnicianName(
          `${profile.first_name} ${profile.last_name}`
        );
      }
    };

    getUser();
  }, []);

  // ================= LOAD ATTENDANCE =================
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("attendance")
        .select("*")
        .order("login_time", { ascending: false });

      if (data) {
        setRecords(data);

        const active = data.find((r) => r.is_active === true);
        if (active) setCurrentSession(active);
      }
    };

    fetchData();
  }, []);

  // ================= LIVE TIMER (FIXED) =================
  useEffect(() => {
  let interval: NodeJS.Timeout;

  if (currentSession?.login_time) {
    // ✅ FORCE UTC PARSING (VERY IMPORTANT FIX)
    const start = Date.parse(currentSession.login_time);

    interval = setInterval(() => {
      const now = Date.now();

      // 🚨 FIX: prevent negative / shifted time issues
      const diff = Math.max(0, Math.floor((now - start) / 1000));

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      setLiveTime(
        `${h.toString().padStart(2, "0")}:${m
          .toString()
          .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }, 1000);
  }

  return () => clearInterval(interval);
}, [currentSession]);
  // ================= LOCATION (FIXED) =================
  const getLocationName = async () => {
    return new Promise<string>((resolve) => {
      if (!navigator.geolocation) {
        resolve("No location");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            const data = await res.json();

            const place =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              "Unknown";

            setLocation(place);
            resolve(place);
          } catch {
            resolve("Unknown");
          }
        },
        () => resolve("Permission denied")
      );
    });
  };

  // ================= FORMATTERS =================
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB");

  const formatTime = (d: string | null) =>
    d ? new Date(d).toLocaleTimeString() : "--";

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ================= CHECK IN =================
  const handleCheckIn = async () => {
    if (!userId || currentSession) return;

    const place = await getLocationName();
    const now = new Date().toISOString(); // FIXED UTC

    const { data } = await supabase
      .from("attendance")
      .insert([
        {
          user_id: userId,
          technician_name: technicianName,
          date: formatDate(new Date()),
          login_time: now,
          logout_time: null,
          location: place,
          total_time: 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (data) {
      setCurrentSession(data);
      setRecords((prev) => [data, ...prev]);
    }
  };

  // ================= CHECK OUT =================
  const handleCheckOut = async () => {
    if (!currentSession) return;

    const place = await getLocationName();
    const now = new Date().toISOString(); // FIXED UTC

    const totalSeconds = Math.floor(
      (Date.now() -
        Date.parse(currentSession.login_time)) /
        1000
    );

    const { data } = await supabase
      .from("attendance")
      .update({
        logout_time: now,
        logout_location: place,
        total_time: totalSeconds,
        is_active: false,
      })
      .eq("id", currentSession.id)
      .select()
      .single();

    if (data) {
      setCurrentSession(null);

      setRecords((prev) =>
        prev.map((r) =>
          r.id === data.id ? data : r
        )
      );
    }
  };

  // ================= UI =================
 return (
  <div className="min-h-screen bg-gray-100 p-3 sm:p-4 text-black">
    <div className="bg-white w-full max-w-5xl mx-auto p-4 sm:p-6 rounded-xl shadow">

      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">
        Attendance Tracker
      </h2>

      <p className="text-center text-sm sm:text-base mb-4 font-medium">
        User: {technicianName}
      </p>

      {/* BUTTONS (RESPONSIVE) */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={handleCheckIn}
          disabled={!!currentSession}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto disabled:opacity-50"
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!currentSession}
          className="bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto disabled:opacity-50"
        >
          Check Out
        </button>
      </div>

      {/* ACTIVE SESSION CARD */}
      {currentSession && (
        <div className="text-center mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg text-sm sm:text-base">
          <p><b>Date:</b> {currentSession.date}</p>
          <p><b>Login:</b> {formatTime(currentSession.login_time)}</p>
          <p className="text-green-700 font-bold text-lg sm:text-xl">
            Live Time: {liveTime}
          </p>
          <p><b>Location:</b> {location || currentSession.location}</p>
        </div>
      )}

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border text-center text-sm sm:text-base">
          
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Login</th>
              <th className="p-2">Logout</th>
              <th className="p-2">Location</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Logout Location</th>
            </tr>
          </thead>

          <tbody>
            {records
              .filter((r) => r.user_id === userId)
              .map((r, i) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{r.technician_name}</td>
                  <td className="p-2">{r.date}</td>
                  <td className="p-2">{formatTime(r.login_time)}</td>
                  <td className="p-2">{formatTime(r.logout_time)}</td>
                  <td className="p-2">{r.location}</td>
                  <td className="p-2">{formatDuration(r.total_time)}</td>
                  <td className="p-2">{(r as any).logout_location || "--"}</td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>

    </div>
  </div>
);
}