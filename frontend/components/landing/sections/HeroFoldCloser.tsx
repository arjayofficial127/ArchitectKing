'use client';

export function HeroFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 mt-8 md:mt-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-gray-500 mb-2">Solutions Architect — Scalable SaaS Systems</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.05] mt-1">
          Built to scale. Not break.
        </h1>

        <p className="mt-3 text-xl text-slate-600 max-w-3xl mx-auto">
          I design and evolve scalable, production systems — built to perform under pressure and grow with your business.
        </p>

        <ul className="mt-6 space-y-2 text-slate-700 max-w-md mx-auto text-left md:text-center">
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>15+ Years in Production Systems</span></li>
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>20+ Systems Designed & Delivered</span></li>
          <li className="flex items-start md:justify-center"><span className="text-[#F4C430] mr-3">✔</span><span>Multi-tenant • RBAC • Payment Architectures</span></li>
        </ul>

        <p className="mt-1 text-sm text-slate-500 text-center">Operating at Senior, Lead, and Architect levels</p>

        <div className="mt-10">
          <button
            type="button"
            aria-label="Let’s Work Together"
            onClick={(e) => {
              e.preventDefault();
              const ids = ['contact', 'contact-me', 'contact-section', 'contactForm'];
              for (const id of ids) {
                const el = document.getElementById(id);
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
              }
              const ev = new CustomEvent('open-contact-popover', { bubbles: true, cancelable: true });
              const notCanceled = window.dispatchEvent(ev);
              if (notCanceled) { window.location.href = 'mailto:arvinjaysoncastro@gmail.com'; }
            }}
            className="bg-yellow-400 px-6 py-3 rounded font-semibold inline-block"
          >
            Let’s Work Together
          </button>
          <div className="mt-2 text-xs text-slate-500 text-center">Open to building and scaling production systems with the right team</div>
        </div>
      </div>
    </section>
  );
}
