'use client';

type LogoStripFinalBossProps = {
  className?: string;
};

const logos = [
  { name: 'Aotech', src: '/architectking/companies/aotech.png' },
  { name: 'Kinetic Innovative Staffing', src: '/architectking/companies/kinetic_innovative_staffing.png' },
  { name: 'Optimum Innovatus', src: '/architectking/companies/optimum_innovatus.png' },
  { name: 'Pointwest Technologies', src: '/architectking/companies/pointwest_technologies.png' },
  { name: 'Trinko', src: '/architectking/companies/trinko.png' },
  { name: 'Visa', src: '/architectking/companies/visa.png' },
  { name: 'Starbucks', src: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg' },
  { name: 'Willis Towers Watson', src: '/architectking/companies/willis_towers_watson.png' },
] as const;

export function LogoStripFinalBoss({ className = 'mt-12' }: LogoStripFinalBossProps) {
  return (
    <div className={`hero-marquee relative w-full max-w-full min-w-0 overflow-hidden ${className}`}>
      <p className="sr-only">
        Experience across {logos.map((logo) => logo.name).join(', ')}.
      </p>

      {/* 🔥 LEFT FADE */}
      {/* <div className="hero-marquee__fade hero-marquee__fade-left pointer-events-none absolute left-0 top-0 h-full z-10" /> */}

      {/* 🔥 RIGHT FADE */}
      {/* <div className="hero-marquee__fade hero-marquee__fade-right pointer-events-none absolute right-0 top-0 h-full z-10" /> */}

      <div className="hero-marquee__track flex min-w-[100%] items-center gap-x-16 animate-marquee" aria-hidden="true">
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

        .hero-marquee__fade {
          width: 4rem;
        }

        .hero-marquee__fade-left {
          background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        .hero-marquee__fade-right {
          background: linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        @media (max-width: 640px) {
          .hero-marquee__fade {
            width: 2.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-marquee__track {
            animation: none;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
