"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ✅ Proper Type
type Report = {
  id: string;
  technician_name: string;
  site_name: string;
  date: string;
  files: string[];
  status: string;
};

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        setReports(data || []);
      }
    };

    fetchReports();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const reportsToday = reports.filter((r) => r.date === today).length;

  const totalReports = reports.length;

  // ✅ FIXED: correct logic
  const pendingReports = reports.filter(
    (r) => r.status !== "Submitted"
  ).length;

  const allReports = reports.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black font-sans ">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Monitor attendance and daily reports
        </p>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Reports Today"
          value={reportsToday.toString()}
          bg="bg-red-200"
        />

        <StatCard
          title="Total Reports"
          value={totalReports.toString()}
          bg="bg-green-100"
        />

        <Link href="/allreports">
          <StatCard
            title="All Reports"
            value={allReports.toString()}
            bg="bg-yellow-100"
          />
        </Link>
      </section>

      {/* Attendance */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">
          Attendance Tracker
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-orange-200">
              <tr>
                <Th>Technician</Th>
                <Th>Date</Th>
                <Th>Login Time</Th>
                <Th>Logout Time</Th>
                <Th>Location</Th>
              </tr>
            </thead>
            <tbody>{/* Keep empty or add later */}</tbody>
          </table>
        </div>
      </section>

      {/* REPORT TABLE */}
      <section>
        <h2 className="text-lg font-semibold mb-3">
          Daily Reports
        </h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-pink-100">
              <tr>
                <Th>Technician</Th>
                <Th>Site Name</Th>
                <Th>Date</Th>
                <Th>Files</Th>
                <Th>Status</Th>
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
                  <ReportRow
                    key={r.id}
                    name={r.technician_name}
                    site={r.site_name}
                    date={r.date}
                    files={r.files || []}
                    status={r.status}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// =====================
// COMPONENTS
// =====================

function StatCard({
  title,
  value,
  bg,
}: {
  title: string;
  value: string;
  bg: string;
}) {
  return (
    <div className={`${bg} rounded-lg shadow p-4`}>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-3 text-left font-medium">{children}</th>;
}

function ReportRow({
  name,
  site,
  date,
  files,
  status,
}: {
  name: string;
  site: string;
  date: string;
  files: string[];
  status: string;
}) {
  return (
    <tr className="border-t align-top">
      <td className="p-3">{name}</td>
      <td className="p-3">{site}</td>
      <td className="p-3">{date}</td>

      {/* FILES */}
      <td className="p-3 flex flex-wrap gap-2">
        {files.length === 0 ? (
          "0 files"
        ) : (
          files.map((url, i) => {
            const ext = url?.split(".").pop()?.toLowerCase() || "";

            if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
              return (
                <img
                  key={i}
                  src={url}
                  alt={`file-${i}`}
                  className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80"
                  onClick={() => window.open(url, "_blank")}
                />
              );
            }

            if (["mp4", "mov", "webm"].includes(ext)) {
              return (
                <div
                  key={i}
                  className="w-12 h-12 bg-black rounded relative cursor-pointer flex items-center justify-center"
                  onClick={() => window.open(url, "_blank")}
                >
                  <video
                    src={url}
                    className="absolute w-full h-full object-cover rounded opacity-80"
                  />
                  <span className="absolute text-white font-bold text-xs">
                    ▶
                  </span>
                </div>
              );
            }

            return (
              <a
                key={i}
                href={url}
                target="_blank"
                className="text-blue-500 underline"
              >
                View File
              </a>
            );
          })
        )}
      </td>

      {/* STATUS */}
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            status === "Submitted"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}