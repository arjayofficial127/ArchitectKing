'use client';

import classes from '../arvinLandingPage.module.css';

export function CTAFold() {
  return (
    <section className={classes.finalClose}>
      <div className={classes.finalCloseInner}>
        <h2 className={classes.finalCloseTitle}>
          Fix Your System Before It Breaks in Production
        </h2>
        <ul className="mb-6 mt-4 space-y-2 text-base text-slate-700">
          <li>• Prevent costly outages and downtime</li>
          <li>• Remove scaling bottlenecks before they hurt growth</li>
          <li>• Get actionable, expert feedback fast</li>
        </ul>
        <p className="text-base text-slate-700 mb-6">
          Outcome: A clear, prioritized action plan for your SaaS system.
        </p>
        <a
          href="/contact-me"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4C430] px-8 py-4 text-base font-semibold text-[#0F172A] shadow-xl shadow-[#F4C430]/40 ring-1 ring-[#F4C430]/30 transition-all hover:-translate-y-0.5 hover:bg-[#F4C430]/90 hover:shadow-2xl hover:shadow-[#F4C430]/50 focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-2"
        >
          Get Expert Feedback on Your System
        </a>
      </div>
    </section>
  );
}
