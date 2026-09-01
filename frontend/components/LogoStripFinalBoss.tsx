'use client';

const logos = [
  { name: 'Aotech', src: '/architectking/companies/aotech.png' },
  { name: 'Kinetic Innovative Staffing', src: '/architectking/companies/kinetic_innovative_staffing.png' },
  { name: 'Optimum Innovatus', src: '/architectking/companies/optimum_innovatus.png' },
  { name: 'Pointwest Technologies', src: '/architectking/companies/pointwest_technologies.png' },
  { name: 'Trinko', src: '/architectking/companies/trinko.png' },
  { name: 'Visa', src: '/architectking/companies/visa.png' },
  { name: 'Willis Towers Watson', src: '/architectking/companies/willis_towers_watson.png' },
] as const;

export function LogoStripFinalBoss() {
  return (
    <div className="relative mt-12 overflow-hidden">
      <p className="sr-only">
        Experience across {logos.map((logo) => logo.name).join(', ')}.
      </p>

      {/* 🔥 LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

      {/* 🔥 RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      <div className="flex items-center gap-x-16 animate-marquee" aria-hidden="true">
        {[...logos, ...logos].map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="h-16 w-40 flex items-center justify-center">
            <img
              src={logo.src}
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
