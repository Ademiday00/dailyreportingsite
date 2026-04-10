"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPeace, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import WelcomeNavbar from "../welcomenavbar/page";

type Profile = {
  first_name: string;
  last_name: string;
};

type Report = {
  id: string;
  technician_name: string;
  site_name: string;
  date: string;
  status: string;
};

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [fullName, setFullName] = useState("User");

  useEffect(() => {
    const init = async () => {
      // 1. Get session user (IMPORTANT FIX)
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) return;

      // 2. Fetch profile using user.id
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();

      if (!error && profile) {
        setFullName(`${profile.first_name} ${profile.last_name}`);
      }

      // 3. Fetch reports
      const { data: reportsData, error: reportError } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (!reportError && reportsData) {
        setReports(reportsData);
      }
    };

    init();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const reportsToday = reports.filter((r) => r.date === today).length;
  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (r) => r.status !== "Submitted"
  ).length;

  return (
    <div className="font-serif min-h-screen bg-gray-50 text-black p-6 md:p-10 ">
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome {" "}
            <FontAwesomeIcon className="text-yellow-500" icon={faHandPeace} />
          </h1>
          <p className="text-gray-600 mt-1 text-xs">
            What would you like to do today?
          </p>
        </div>

        <div className="flex-1 flex justify-end">
          <WelcomeNavbar />
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Link href="/daily" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          Create Daily Report
        </Link>

        <Link href="/allreports" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          My Reports
        </Link>

        <Link href="/profile" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Reports Today</p>
          <h2 className="text-2xl font-bold">{reportsToday}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Total Reports</p>
          <h2 className="text-2xl font-bold">{totalReports}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-sm text-gray-500">Pending Review</p>
          <h2 className="text-2xl font-bold">{pendingReports}</h2>
        </div>
      </div>

      {/* Recent */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-4">Recent Activity</h2>

        <ul className="text-sm text-gray-600 space-y-2">
          {reports.slice(0, 5).map((r) => (
            <li key={r.id}>
              <FontAwesomeIcon
                icon={faCheckSquare}
                className="text-green-600 text-sm mr-1"
              />
              {r.technician_name} - {r.site_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}