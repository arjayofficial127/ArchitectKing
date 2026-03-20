'use client';

export function CloseFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How I Can Help</h2>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="p-4 border rounded-md w-48 text-center">
            <h4 className="font-semibold">Full-Stack</h4>
            <p className="text-sm text-slate-600 mt-1">Deliver end-to-end features</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center">
            <h4 className="font-semibold">Architect</h4>
            <p className="text-sm text-slate-600 mt-1">Design scalable systems</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center">
            <h4 className="font-semibold">UI/UX</h4>
            <p className="text-sm text-slate-600 mt-1">Improve product experience</p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="mailto:arjayofficial127@gmail.com"
            className="bg-yellow-400 px-6 py-3 rounded font-semibold inline-block"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
