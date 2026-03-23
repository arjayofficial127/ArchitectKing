'use client';

        import Link from 'next/link';
        import { SiteNavbar } from '@/components/shared/SiteNavbar';
        import { AmbientBackground } from '@/components/ui/AmbientBackground';

        export default function UrgentHirePage() {
          return (
            <div className="relative min-h-screen bg-white text-slate-800">
              {/* Subtle background */}
              <AmbientBackground 
                gridSize={64} 
                lightCount={6} 
                enableGradient={true}
                gradientOpacity={0.05}
                enableGrain={true}
                grainOpacity={0.03}
              />

              {/* Header */}
              <SiteNavbar />

              <main className="relative">
                <div className="px-6 py-10 md:py-16 overflow-x-hidden">
                  <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 md:gap-6">
                    {/* Back link */}
                    <div className="mb-4 text-left">
                      <Link
                        href="/"
                        className="inline-flex items-center text-base text-slate-600 hover:underline transition-colors group"
                      >
                        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to main site
                      </Link>
                    </div>

                    {/* Main Content */}
                    <div className="text-center">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
                        Need help fixing your React / Next.js app fast?
                      </h1>
                      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-2">
                        I jump into broken or slow systems and get them working again — quickly.
                      </p>
                    </div>

                    {/* Pain Section */}
                    <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 md:p-6">
                      <h2 className="text-lg font-semibold text-slate-900 mb-2 text-center">If you're dealing with:</h2>
                      <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700 mb-2">
                        <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Build errors or failed deployments</span></li>
                        <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>Slow or unstable production apps</span></li>
                        <li className="flex items-start"><span className="text-[#F4C430] mr-2">•</span><span>API or data issues blocking progress</span></li>
                      </ul>
                    </div>

                    {/* Proof Section */}
                    <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4 md:p-6">
                      <h2 className="text-lg font-semibold text-slate-900 mb-2 text-center">Selected Work:</h2>
                      <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700 mb-2">
                        <li className="flex items-start"><span className="text-[#22c55e] mr-2">•</span><span>Stabilized multi-tenant platforms (RBAC, payments)</span></li>
                        <li className="flex items-start"><span className="text-[#22c55e] mr-2">•</span><span>Fixed production issues in React / Next.js apps</span></li>
                        <li className="flex items-start"><span className="text-[#22c55e] mr-2">•</span><span>Delivered internal tools used daily by teams</span></li>
                      </ul>
                    </div>

                    {/* Speed + Risk */}
                    <div className="text-center text-base text-slate-700">
                      Available to start immediately. If I can’t help, I’ll tell you upfront.
                    </div>

                    {/* Price Signal */}
                    <div className="text-center text-base text-slate-600">
                      Typical fixes: ₱3K–₱10K depending on scope
                    </div>

                    {/* CTA Section */}
                    <div className="text-center space-y-3 mt-2">
                      <a
                        href="mailto:arvinjaysoncastro@gmail.com"
                        className="inline-flex w-full md:w-auto items-center justify-center rounded-lg bg-black px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      >
                        Send me the issue — I’ll reply with a fix plan today
                      </a>
                      <p className="text-xs text-slate-500 mt-2">Response within a few hours.</p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          );
        }