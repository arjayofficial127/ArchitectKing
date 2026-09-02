type ProofIconName = 'boundaries' | 'access' | 'rules' | 'delivery' | 'data' | 'incidents' | 'workflow' | 'integration' | 'review' | 'stabilize' | 'team';

/** Small interface symbols, sharing the site's existing outline-icon language. */
export function ProofIcon({ name, className }: { name: ProofIconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'boundaries' && <><rect x="5" y="5" width="11" height="11" rx="1.5" /><rect x="5" y="32" width="11" height="11" rx="1.5" /><rect x="32" y="18.5" width="11" height="11" rx="1.5" /><path d="M16 10.5 32 24 16 37.5M10.5 16v16" /></>}
      {name === 'access' && <><path d="M24 4c6 4 12 6 17 6v14c0 10-8 17-17 21C15 41 7 34 7 24V10c5 0 11-2 17-6Z" /><path d="M27 25.5V34h-6v-8.5a5 5 0 1 1 6 0Z" /></>}
      {name === 'rules' && <><rect x="10" y="5" width="27" height="34" rx="3" /><path d="M38 11h3v32H16v-3M22 14h9M22 22h9M22 30h9" /><circle cx="16" cy="14" r="1" /><circle cx="16" cy="22" r="1" /><circle cx="16" cy="30" r="1" /></>}
      {name === 'delivery' && <><path d="M5 6v36h38M10 40V20h6v20M22 40V27h6v13M34 40v-6h6v6M11 9l29 15M32 23l9 2-2-9" /></>}
      {name === 'data' && <><ellipse cx="19" cy="9" rx="13" ry="5" /><path d="M6 9v24c0 3 6 5 13 5h2M6 17c0 3 6 5 13 5s13-2 13-5V9M6 25c0 3 6 5 13 5h2" /><circle cx="34" cy="29" r="5" /><path d="M24 44v-2a10 7 0 0 1 20 0v2Z" /></>}
      {name === 'incidents' && <><path d="M7 18A18 18 0 0 1 39 12l3 3M42 7v8h-8M41 30A18 18 0 0 1 9 36l-3-3M6 41v-8h8M24 15v12" /><circle cx="24" cy="33" r=".8" /></>}
      {name === 'workflow' && <><path d="m13 4 7 7-7 7-7-7ZM20 11h19v12M13 18v18h12M32 23h13v12H32ZM32 40H25v-9" /><rect x="3" y="31" width="15" height="11" rx="1.5" /><path d="m27 8 3 3-3 3m9 6 3 3 3-3" /></>}
      {name === 'integration' && <><rect x="4" y="4" width="15" height="15" rx="3" /><rect x="29" y="29" width="15" height="15" rx="3" /><path d="M29 11h7a2 2 0 0 1 2 2v10M19 37h-7a2 2 0 0 1-2-2V25m21-17-3 3 3 3M13 28l-3-3-3 3M15 24h5l3-5 4 10 3-5h5" /></>}
      {name === 'review' && <><circle cx="20" cy="20" r="14" /><path d="m30 30 13 13M13 20h14M20 13v14" /></>}
      {name === 'stabilize' && <><rect x="5" y="14" width="38" height="28" rx="3" /><path d="M17 14V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5M5 26h15m8 0h15" /><rect x="20" y="23" width="8" height="7" rx="1" /></>}
      {name === 'team' && <><circle cx="24" cy="12" r="6" /><circle cx="8" cy="18" r="4" /><circle cx="40" cy="18" r="4" /><path d="M13 41v-6a11 11 0 0 1 22 0v6ZM10 28a7 7 0 0 0-9 7v3h8m29-10a7 7 0 0 1 9 7v3h-8" /></>}
    </svg>
  );
}
