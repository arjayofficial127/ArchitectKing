'use client';

export function ProofFoldCloser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 bg-slate-50/50">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Systems Delivered Across Companies</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md text-center text-sm text-slate-600">Company A<br/><span className="text-xs text-slate-400">2019</span></div>
          <div className="p-4 border rounded-md text-center text-sm text-slate-600">Company B<br/><span className="text-xs text-slate-400">2020</span></div>
          <div className="p-4 border rounded-md text-center text-sm text-slate-600">Company C<br/><span className="text-xs text-slate-400">2022</span></div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-900">What I’ve Built</h3>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
            <li>RBAC</li>
            <li>Payments</li>
            <li>Multi-App</li>
            <li>Workflows</li>
            <li>Auth</li>
          </ul>

          <p className="mt-6 text-sm text-slate-600">Proven across production systems</p>
        </div>
      </div>
    </section>
  );
}
