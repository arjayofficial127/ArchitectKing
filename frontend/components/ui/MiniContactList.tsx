"use client";

export function QuickContactMini() {
  return (
    <div className="flex flex-col gap-2 text-sm">

      <a
        href="mailto:arvinjaysoncastro@gmail.com"
        className="group flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase text-slate-400 tracking-wide">Email</span>
            <span className="text-slate-700 text-sm">arvinjaysoncastro@gmail.com</span>
          </div>
        </div>

        <span className="text-slate-400 text-xs transition-transform group-hover:translate-x-1">→</span>
      </a>

      <a
        href="https://linkedin.com/in/arvinjaysoncastro"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2h-0" />
              <rect x="2" y="9" width="4" height="12" rx="1" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase text-slate-400 tracking-wide">LinkedIn</span>
            <span className="text-slate-700 text-sm">linkedin.com/in/arvinjaysoncastro</span>
          </div>
        </div>

        <span className="text-slate-400 text-xs transition-transform group-hover:translate-x-1">→</span>
      </a>

      <a
        href="tel:+639627675114"
        className="group flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19 19 0 0 1 3 4.11 1 1 0 0 1 4 3h4.09a1 1 0 0 1 1 .75c.12.7.36 1.37.7 2a1 1 0 0 1-.24 1L8.91 9.09a16 16 0 0 0 6 6l1.34-1.34a1 1 0 0 1 1-.24c.63.34 1.3.58 2 .7a1 1 0 0 1 .75 1V21z" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase text-slate-400 tracking-wide">Phone</span>
            <span className="text-slate-700 text-sm">+63 962 767 5114</span>
          </div>
        </div>

        <span className="text-slate-400 text-xs transition-transform group-hover:translate-x-1">→</span>
      </a>

    </div>
  );
}
