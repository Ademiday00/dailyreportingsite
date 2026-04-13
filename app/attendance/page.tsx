"use client";
import { useState } from "react";

type AttendanceSession = {
  date: string;
  loginTime: Date;
  logoutTime: Date | null;
  location: string | null;
  totalTime: number;
};

export default function AttendancePage() {
  const [userEmail] = useState("user@example.com");
  const [records, setRecords] = useState<AttendanceSession[]>([]);
  const [currentSession, setCurrentSession] = useState<AttendanceSession | null>(null);
  const [location, setLocation] = useState<string | null>(null);

 
  const getLocationName = async () => {
    return new Promise<string>((resolve) => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const place =
            data.address.city ||
            data.address.town ||
            data.address.suburb ||
            data.address.village ||
            "Unknown";
          setLocation(place);
          resolve(place);
        } catch {
          resolve("Unknown");
        }
      });
    });
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleCheckIn = async () => {
    const place = await getLocationName();
    const now = new Date();

    const session: AttendanceSession = {
      date: formatDate(now),
      loginTime: now,
      logoutTime: null,
      location: place,
      totalTime: 0,
    };

    setCurrentSession(session);
    setRecords([session, ...records]);
  };

  const handleCheckOut = () => {
    if (!currentSession) return;

    const now = new Date();
    const updatedSession: AttendanceSession = {
      ...currentSession,
      logoutTime: now,
      totalTime: Math.floor(
        (now.getTime() - currentSession.loginTime.getTime()) / 1000
      ),
    };

    setCurrentSession(null);
    setRecords([updatedSession, ...records.slice(1)]);
  };

  const formatTime = (d: Date | null) =>
    d ? d.toLocaleTimeString() : "--";

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black font-sans">
      <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          Attendance Tracker
        </h2>

        <p className="text-center mb-4 font-medium">
          User: {userEmail}
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            disabled={!!currentSession}
            className="bg-green-600 text-white px-5 py-2 rounded disabled:bg-gray-300"
          >
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            disabled={!currentSession}
            className="bg-red-600 text-white px-5 py-2 rounded disabled:bg-gray-300"
          >
            Check Out
          </button>
        </div>

        {currentSession && (
          <div className="text-center mb-4">
            <p>Date: {currentSession.date}</p>
            <p>Login Time: {formatTime(currentSession.loginTime)}</p>
            <p>Location: {location || "Detecting..."}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-2">#</th>
                <th className="border px-2 py-2">Date</th>
                <th className="border px-2 py-2">Time of Arrival</th>
                <th className="border px-2 py-2">Time of Departure</th>
                <th className="border px-2 py-2">Location</th>
                <th className="border px-2 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4">
                    No attendance yet
                  </td>
                </tr>
              )}

              {records.map((r, i) => (
                <tr key={i}>
                  <td className="border">{i + 1}</td>
                  <td className="border">{r.date}</td>
                  <td className="border">{formatTime(r.loginTime)}</td>
                  <td className="border">{formatTime(r.logoutTime)}</td>
                  <td className="border">{r.location}</td>
                  <td className="border">
                    {r.totalTime
                      ? formatDuration(r.totalTime)
                      : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
