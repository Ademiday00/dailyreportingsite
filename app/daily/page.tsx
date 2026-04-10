"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DailyReportPage() {
  const [form, setForm] = useState({
    technicianName: "",
    siteName: "",
    date: "",
    workProgress: "",
    nextVisit: "",
    recommendations: "",
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ GET USER (required for RLS)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("You must be logged in");
        setLoading(false);
        return;
      }

      const uploadedUrls: string[] = [];

      // =========================
      // FILE UPLOAD
      // =========================
      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          const filePath = `reports/${Date.now()}-${file.name}`;

          const { error: uploadError } = await supabase.storage
            .from("report-files")
            .upload(filePath, file);

          if (uploadError) {
            console.error(uploadError.message);
            continue;
          }

          const { data } = supabase.storage
            .from("report-files")
            .getPublicUrl(filePath);

          if (data?.publicUrl) {
            uploadedUrls.push(data.publicUrl);
          }
        }
      }

      // =========================
      // INSERT REPORT
      // =========================
      const { error: insertError } = await supabase.from("reports").insert([
        {
          user_id: user.id,
          technician_name: form.technicianName,
          site_name: form.siteName,
          date: form.date,
          files: uploadedUrls,
          work_progress: form.workProgress,
          next_visit: form.nextVisit,
          recommendations: form.recommendations,
          status: "Submitted",
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError.message);
        alert(insertError.message);
        setLoading(false);
        return;
      }

      alert("Report submitted successfully ✅");

      // reset form
      setForm({
        technicianName: "",
        siteName: "",
        date: "",
        workProgress: "",
        nextVisit: "",
        recommendations: "",
      });

      setFiles(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 sm:text-xs md:text-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Daily Technician Report
        </h2>

        <input
          name="technicianName"
          placeholder="Technician Name"
          value={form.technicianName}
          onChange={handleChange}
          className="input input-bordered w-60 text-black border-black border-1 p-2 rounded-lg "
          required
        />

        <input
          name="siteName"
          placeholder="Site Name"
          value={form.siteName}
          onChange={handleChange}
          className="input input-bordered w-60 text-black border-black border-1 p-2 rounded-lg "
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input input-bordered w-60 text-black border-black border-1 p-2 rounded-lg "
          required
        />

        <textarea
          name="workProgress"
          placeholder="Work Progress"
          value={form.workProgress}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black border-1 p-2 rounded-lg "
          required
        />

        <textarea
          name="nextVisit"
          placeholder="Next Visit"
          value={form.nextVisit}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black border-1 p-2 rounded-lg "
        />

        <textarea
          name="recommendations"
          placeholder="Recommendations"
          value={form.recommendations}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black border-1 p-2 rounded-lg "
        />

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="file-input file-input-bordered w-full text-black"
        />

        <button type="submit" className="btn btn-primary w-full text-black border-black border-1 p-1 rounded -lg">
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}