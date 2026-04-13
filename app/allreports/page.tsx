"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [fullscreenFile, setFullscreenFile] = useState<{ url: string; type: "image" | "video" } | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      // 🔥 FIX: use session instead of getUser()
      const { data: sessionData } = await supabase.auth.getSession();

      const user = sessionData.session?.user;

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Fetch error:", error.message);
      } else {
        setReports(data || []);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-black md:text-sm sm:text-sm">
      <h1 className="text-2xl font-bold mb-6">All Reports</h1>

      {reports.length === 0 ? (
        <p>No reports yet</p>
      ) : (
        <div className="space-y-6">
          {reports.map((r) => (
            <div key={r.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-bold text-lg">
                {r.technician_name} - {r.site_name}
              </h2>
              <p className="text-sm text-gray-500 mb-2 sm:text-xs">{r.date}</p>

              <p className="text-sm mb-2 sm:text-xs">
                <strong>Work:</strong> {r.work_progress}
              </p>

              <p className="text-sm mb-2 sm:text-xs">
                <strong>Next Visit:</strong> {r.next_visit}
              </p>

              <p className="text-sm mb-2 sm:text-xs">
                <strong>Recommendations:</strong> {r.recommendations}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {r.files?.map((file: string, i: number) => {
                  const ext = file.split(".").pop()?.toLowerCase();

                  if (["jpg", "jpeg", "png", "gif"].includes(ext!)) {
                    return (
                      <img
                        key={i}
                        src={file}
                        className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() => setFullscreenFile({ url: file, type: "image" })}
                        alt={`report-file-${i}`}
                      />
                    );
                  } else if (["mp4", "mov", "webm"].includes(ext!)) {
                    return (
                      <div
                        key={i}
                        className="w-32 h-24 bg-black rounded flex items-center justify-center cursor-pointer"
                        onClick={() => setFullscreenFile({ url: file, type: "video" })}
                      >
                        <p className="text-white text-sm">▶ Video</p>
                      </div>
                    );
                  } else {
                    return (
                      <a
                        key={i}
                        href={file}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreenFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setFullscreenFile(null)}
        >
          {fullscreenFile.type === "image" ? (
            <img src={fullscreenFile.url} className="max-h-full max-w-full rounded" />
          ) : (
            <video
              src={fullscreenFile.url}
              className="max-h-full max-w-full rounded"
              controls
              autoPlay
            />
          )}
        </div>
      )}
    </div>
  );
}