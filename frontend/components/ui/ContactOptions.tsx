"use client";

export function ContactOptions() {
  return (
<div className="mt-3 text-center">
  <p className="text-xs text-slate-400 mb-1">
    or message me directly
  </p>

  <div className="flex justify-center flex-wrap gap-4 text-sm text-slate-600">

    <a
      href="mailto:arvinjaysoncastro@gmail.com"
      className="hover:text-slate-900 transition"
    >
      arvinjaysoncastro@gmail.com
    </a>

    <span className="text-slate-300">•</span>

    <a
      href="https://linkedin.com/in/arvinjaysoncastro"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-slate-900 transition"
    >
      Linkedin
    </a>

    <span className="text-slate-300">•</span>

    <a
      href="tel:+639627675114"
      className="hover:text-slate-900 transition"
    >
        +639627675114
    </a>

  </div>
</div>
  );
}
