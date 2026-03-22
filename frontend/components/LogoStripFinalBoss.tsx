'use client';

const logos = [
  '/architectking/companies/aotech.png',
  '/architectking/companies/kinetic_innovative_staffing.png',
  '/architectking/companies/optimum_innovatus.png',
  '/architectking/companies/pointwest_technologies.png',
  '/architectking/companies/trinko.png',
  '/architectking/companies/visa.png',
  '/architectking/companies/willis_towers_watson.png',
];

export function LogoStripFinalBoss() {
  return (
    <div className="relative overflow-hidden mt-12">

      {/* 🔥 LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

      {/* 🔥 RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      <div className="flex items-center gap-x-16 animate-marquee" aria-hidden="true">
        {[...logos, ...logos].map((src, i) => (
          <div key={i} className="h-16 w-40 flex items-center justify-center">
            <img
              src={src}
              alt=""
              className="max-h-full max-w-full object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeFinal {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .animate-marquee {
          width: max-content;
          animation: marqueeFinal 32s linear infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .animate-marquee { animation-duration: 24s; }
        }
      `}</style>
    </div>
  );
}