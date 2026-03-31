'use client';

export function FooterFold() {
  return (
    <footer className="relative border-t border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-xs font-medium text-slate-700">Arvin Jayson Castro</p>
            <p className="mt-1 text-xs text-slate-500">Architect of Scalable Systems</p>
            <p className="text-xs text-slate-500">
              Open to Senior Full-Stack Engineer and Systems Architect roles.
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Architecture Reviews • SaaS Platforms • Admin Dashboards
            </p>
            <p className="mt-2 text-xs text-slate-400">
              BS Computer Science, University of Santo Tomas
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
            <div className="text-center md:text-right">
              <a 
                href="mailto:arvinjaysoncastro@gmail.com" 
                className="block text-xs text-slate-500 hover:text-[#F4C430]"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/arvinjaysoncastro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-1 block text-xs text-slate-500 hover:text-[#F4C430]"
              >
                LinkedIn
              </a>
              {/* <a 
                href="https://www.github.com/arvinjaysoncastro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-1 block text-xs text-slate-500 hover:text-[#F4C430]"
              >
                GitHub
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
