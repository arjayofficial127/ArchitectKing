'use client';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-gray-500 mb-2">Arvin Jayson Castro — Senior Full-Stack Engineer • Technical Architect</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.05] mt-2">
          I Fix Slow, Fragile Systems — And Turn Them Into Scalable, Production-Ready Platforms
        </h1>

        <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
          👉 Code that ships. Systems that hold.
        </p>

        <ul className="mt-6 space-y-2 text-slate-700 max-w-md mx-auto text-left md:text-center">
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>15+ Years Building Production Systems</span></li>
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>20+ Systems Delivered</span></li>
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>Multi-Tenant • RBAC • Payments</span></li>
        </ul>

        <div className="mt-8">
          <a
            href="mailto:arjayofficial127@gmail.com"
            className="bg-yellow-400 px-6 py-3 rounded font-semibold inline-block"
          >
            Fix My System
          </a>
        </div>
      </div>
    </section>
  );
}
