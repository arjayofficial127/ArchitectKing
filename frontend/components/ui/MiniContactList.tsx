"use client";

import { contactMethods } from '@/lib/contactMethods';

export function QuickContactMini() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {contactMethods.map((method) => (
        <a
          key={method.label}
          href={method.href}
          target={method.href.startsWith('http') ? '_blank' : undefined}
          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group flex items-center justify-between px-2 py-2 rounded-md hover:bg-slate-100 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              {method.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase text-slate-400">{method.label}</div>
              <div className="text-sm font-medium text-slate-900 truncate">{method.value}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
