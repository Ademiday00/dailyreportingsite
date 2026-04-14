"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ================= TYPES =================
type Report = {
  id: string;
  technician_name: string;
  site_name: string;
  date: string;
  files: string[];
  status: string;
};

type Attendance = {
  id: string;
  technician_name: string;
  date: string;
  login_time: string;
  logout_time: string | null;
  location: string;
  total_time: number;
};

// ================= PAGE =================
export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .order("date", { ascending: false });

      if (data) setReports(data);
    };

    const fetchAttendance = async () => {
      const { data } = await supabase
        .from("attendance")
        .select("*")
        .order("login_time", { ascending: false });

      if (data) setAttendance(data);
    };

    fetchReports();
    fetchAttendance();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const reportsToday = reports.filter((r) => r.date === today).length;
  const totalReports = reports.length;

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black font-sans">

      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Monitor attendance and daily reports
        </p>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-red-200 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Reports Today</p>
          <p className="text-2xl font-bold">{reportsToday}</p>
        </div>

        <div className="bg-green-100 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Reports</p>
          <p className="text-2xl font-bold">{totalReports}</p>
        </div>

        <Link href="/allreports">
          <div className="bg-yellow-100 rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">All Reports</p>
            <p className="text-2xl font-bold">{totalReports}</p>
          </div>
        </Link>

      </section>

      {/* ================= ATTENDANCE ================= */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">
          Attendance Tracker
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">

            <thead className="bg-orange-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Login</th>
                <th className="p-3 text-left">Logout</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Duration</th>
              </tr>
            </thead>

            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No attendance yet
                  </td>
                </tr>
              ) : (
                attendance.map((a) => (
                  <tr key={a.id} className="border-t">

                    <td className="p-3 font-semibold">
                      {a.technician_name}
                    </td>

                    <td className="p-3">{a.date}</td>

                    <td className="p-3">
                      {new Date(a.login_time).toLocaleTimeString()}
                    </td>

                    <td className="p-3">
                      {a.logout_time
                        ? new Date(a.logout_time).toLocaleTimeString()
                        : "--"}
                    </td>

                    <td className="p-3">{a.location}</td>

                    <td className="p-3">
                      {a.total_time
                        ? `${Math.floor(a.total_time / 3600)}h ${Math.floor(
                            (a.total_time % 3600) / 60
                          )}m`
                        : "--"}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </section>

      {/* ================= REPORTS ================= */}
      <section>
        <h2 className="text-lg font-semibold mb-3">
          Daily Reports
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">

            <thead className="bg-pink-100">
              <tr>
                <th className="p-3 text-left">Technician</th>
                <th className="p-3 text-left">Site Name</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Files</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No reports yet
                  </td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r.id} className="border-t">

                    <td className="p-3">{r.technician_name}</td>
                    <td className="p-3">{r.site_name}</td>
                    <td className="p-3">{r.date}</td>

                    <td className="p-3">
  {r.files?.length ? (
    <div className="flex gap-2 flex-wrap">
      {r.files.slice(0, 3).map((file, index) => {
        const isImage = file.match(/\.(jpg|jpeg|png|webp)$/i);
        const isVideo = file.match(/\.(mp4|webm|mov)$/i);

        return (
          <div
            key={index}
            className="w-12 h-12 border rounded-md overflow-hidden flex items-center justify-center bg-gray-100"
          >
            {isImage && (
              <img
                src={file}
                alt="report"
                className="w-full h-full object-cover"
              />
            )}

            {isVideo && (
              <video className="w-full h-full object-cover">
                <source src={file} />
              </video>
            )}

            {!isImage && !isVideo && (
              <span className="text-xs text-gray-500">File</span>
            )}
          </div>
        );
      })}

      {/* IF MORE THAN 3 FILES */}
      {r.files.length > 3 && (
        <div className="w-12 h-12 border rounded-md flex items-center justify-center text-xs bg-gray-200">
          +{r.files.length - 3}
        </div>
      )}
    </div>
  ) : (
    <span className="text-gray-400 text-sm">No files</span>
  )}
</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          r.status === "Submitted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </section>

    </div>
  );
}