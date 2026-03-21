"use client";

import React from "react";

export default function ResumePage() {
  const pdfUrl = "/pdf/ARVIN_JAYSON_CASTRO_-_Solutions_Architect.pdf";

  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Arvin Jayson Castro — Solutions Architect
          </h1>
          <p className="sr-only">Resume of Arvin Jayson Castro</p>

          <div className="mt-6 flex justify-center">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Download Resume
            </a>
          </div>
        </header>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-100">
          <div className="w-full h-[60vh] sm:h-[72vh] md:h-[85vh] bg-white">
            <iframe
              src={pdfUrl}
              title="Resume PDF"
              className="w-full h-full"
              aria-label="Resume PDF viewer"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
