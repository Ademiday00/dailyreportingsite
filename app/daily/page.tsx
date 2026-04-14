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

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= FIXED FILE HANDLER =================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;

    if (!selected || selected.length === 0) {
      setFiles([]);
      setPreviewUrls([]);
      return;
    }

    const fileArray = Array.from(selected);

    setFiles(fileArray);

    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setPreviewUrls(urls);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const filePath = `reports/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from("report-files")
          .upload(filePath, file);

        if (!error) {
          const { data } = supabase.storage
            .from("report-files")
            .getPublicUrl(filePath);

          if (data?.publicUrl) uploadedUrls.push(data.publicUrl);
        }
      }

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
        setLoading(false);
        return;
      }

      // reset form
      setForm({
        technicianName: "",
        siteName: "",
        date: "",
        workProgress: "",
        nextVisit: "",
        recommendations: "",
      });

      setFiles([]);
      setPreviewUrls([]);

      alert("Report submitted successfully ✅");
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 flex justify-center items-center p-6">
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
          className="input input-bordered w-60 text-black border-black p-2 rounded-lg"
        />

        <input
          name="siteName"
          placeholder="Site Name"
          value={form.siteName}
          onChange={handleChange}
          className="input input-bordered w-60 text-black border-black p-2 rounded-lg"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input input-bordered w-60 text-black border-black p-2 rounded-lg"
        />

        <textarea
          name="workProgress"
          placeholder="Work Progress"
          value={form.workProgress}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black p-2 rounded-lg"
        />

        <textarea
          name="nextVisit"
          placeholder="Next Visit"
          value={form.nextVisit}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black p-2 rounded-lg"
        />

        <textarea
          name="recommendations"
          value={form.recommendations}
          onChange={handleChange}
          className="textarea textarea-bordered w-full text-black border-black p-2 rounded-lg"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full text-black"
        />

        {/* ================= PREVIEW (FIXED) ================= */}
        {previewUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="w-16 h-16 border-2 border-black rounded-md overflow-hidden bg-gray-200"
              >
                <img
                  src={url}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full text-black border-black p-1 rounded"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}