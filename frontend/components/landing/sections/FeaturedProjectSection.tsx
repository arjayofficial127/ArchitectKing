import Image from 'next/image';
import { DiagramCreator } from '@/components/case-studies/DiagramCreator';
import { selectedProductionWorkDiagrams } from '../selectedProductionWorkDiagrams';

export function FeaturedProjectSection() {
  return (
    <section id="featured-project" className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4 text-center">
          Featured Project
        </h2>
        <p className="text-sm text-slate-500 mb-14 text-center">
          airunote
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">airunote</h3>
            <p className="text-sm text-slate-600 mb-6">
              AI-assisted knowledge management platform designed with modular architecture and installable apps.
            </p>
            <div className="mb-6 text-sm text-slate-700">
              <div><span className="font-semibold">Problem:</span><br/>Slow, unstructured knowledge retrieval</div>
              <div className="mt-3"><span className="font-semibold">Solution:</span><br/>Modular SaaS architecture with AI pipeline</div>
              <div className="mt-3 p-4 rounded-lg bg-[#FFFDF4] border border-[#F4C430]/40">
                <span className="font-semibold text-[#F4C430]">Result:</span><br/>
                <span className="flex items-start"><span className="text-[#F4C430] mr-2 font-bold">•</span><span><b>3x faster</b> data retrieval</span></span>
                <span className="flex items-start"><span className="text-[#F4C430] mr-2 font-bold">•</span><span><b>Scalable</b> system foundation</span></span>
                <span className="flex items-start"><span className="text-[#F4C430] mr-2 font-bold">•</span><span><b>Extensible</b> via installable apps</span></span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm mb-5">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Project Screenshot
              </p>
              <Image
                src="/architectking/airunote-preview.png"
                alt="airunote project screenshot"
                width={1365}
                height={768}
                className="h-48 w-full rounded border border-slate-200 object-cover"
              />
            </div>
            <a
              href="/case-studies/airunote"
              className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:bg-[#F4C430]/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
            >
              View Case Study
            </a>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
              Architecture Diagram
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
              <DiagramCreator data={selectedProductionWorkDiagrams.airunote} className="p-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
