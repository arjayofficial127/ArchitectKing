interface CaseStudyProps {
  title: string;
  problem: string;
  constraint: string;
  architecture: string;
  result: string;
  proof: string;
}

export function CaseStudy({
  title,
  problem,
  constraint,
  architecture,
  result,
  proof,
}: CaseStudyProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      
      <div className="mt-6 space-y-6">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Problem</h4>
          <p className="mt-2 text-slate-700">{problem}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Constraint</h4>
          <p className="mt-2 text-slate-700">{constraint}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Architecture Decision</h4>
          <p className="mt-2 text-slate-700">{architecture}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Result</h4>
          <p className="mt-2 text-slate-700">{result}</p>
        </div>

        <div className="rounded-lg border-l-4 border-teal-600 bg-teal-50/50 p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-teal-900">What This Proves</h4>
          <p className="mt-2 text-teal-800">{proof}</p>
        </div>
      </div>
    </article>
  );
}
