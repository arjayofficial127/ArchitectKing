
type ImprovementCardData = {
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
  borderClass: string;
  shadowClass: string;
};

const improvementsData: ImprovementCardData[] = [
  {
    beforeTitle: 'Before',
    beforeItems: [
      'Dashboards slow down as the database grows',
      'Every page runs heavy queries',
      'Performance degrades with more users',
    ],
    afterTitle: 'After',
    afterItems: [
      'Query aggregation layer added',
      'Caching strategy introduced',
      'API response time reduced dramatically',
    ],
    borderClass: 'border-slate-300',
    shadowClass: 'shadow-md',
  },
  {
    beforeTitle: 'Before',
    beforeItems: [
      'Backend changes are risky',
      'Developers afraid to touch core modules',
      'Deployments break unexpectedly',
    ],
    afterTitle: 'After',
    afterItems: [
      'Clean service boundaries introduced',
      'Clear architecture layers defined',
      'Safe deployments and faster iteration',
    ],
    borderClass: 'border-slate-200',
    shadowClass: 'shadow-sm',
  },
  {
    beforeTitle: 'Before',
    beforeItems: [
      'APIs built quickly during MVP',
      'Endpoints tightly coupled',
      'Scaling becomes difficult',
    ],
    afterTitle: 'After',
    afterItems: [
      'API design standardized',
      'Domain separation introduced',
      'Scalable service architecture implemented',
    ],
    borderClass: 'border-slate-200',
    shadowClass: 'shadow-sm',
  },
];

function ImprovementCard({
  beforeTitle,
  beforeItems,
  afterTitle,
  afterItems,
  borderClass,
  shadowClass,
}: ImprovementCardData) {
  return (
    <div>
      <div className={`h-full bg-white rounded-xl border ${borderClass} ${shadowClass} p-6`}>
        <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">{beforeTitle}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {beforeItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-[#F4C430]/40 bg-[#FFFDF4] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">{afterTitle}</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {afterItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ArchitectureImprovementsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6 text-center">
          Architecture Improvements in Practice
        </h2>
        <p className="text-sm text-slate-500 mb-14 text-center max-w-3xl mx-auto">
          Examples of common SaaS architecture problems and how they are solved.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {improvementsData.map((card, i) => (
            <ImprovementCard
              key={i}
              beforeTitle={card.beforeTitle}
              beforeItems={card.beforeItems}
              afterTitle={card.afterTitle}
              afterItems={card.afterItems}
              borderClass={card.borderClass}
              shadowClass={card.shadowClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
