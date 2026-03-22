"use client";

import { QuickContactMini } from './MiniContactList';

export function QuickContactPanel({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="absolute right-8 top-20 w-80 bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">

        <div onClick={(e) => e.stopPropagation()}>
          <p className="text-xs font-medium text-slate-400 mb-2">Contact</p>
          <QuickContactMini />
        </div>
    </div>
  );
}
