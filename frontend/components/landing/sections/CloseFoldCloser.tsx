'use client';

export function CloseFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How I Can Help</h2>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch justify-center gap-6">
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">Full-Stack</h4>
            <p className="text-sm text-slate-600 mt-2">Deliver end-to-end features</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">Architect</h4>
            <p className="text-sm text-slate-600 mt-2">Design scalable systems</p>
          </div>
          <div className="p-4 border rounded-md w-48 text-center flex flex-col">
            <h4 className="font-semibold text-slate-900">UI/UX</h4>
            <p className="text-sm text-slate-600 mt-2">Improve product experience</p>
          </div>
        </div>

        <div className="mt-8 max-w-md mx-auto text-center">
          <p className="text-sm text-slate-600">Need help building or fixing your system?</p>
          <div className="mt-4">
            <button
              type="button"
              aria-label="Contact Me"
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
              className="bg-yellow-400 px-8 py-3 rounded font-semibold inline-block text-center"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
