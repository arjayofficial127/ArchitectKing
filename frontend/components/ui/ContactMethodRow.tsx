"use client";

import Link from 'next/link';
import React from 'react';
import { CONTACT_ICON_MAP, type ContactIconType } from '@/components/icons/ContactIcons';

type Props = {
  label: string;
  value: string;
  href: string;
  icon?: React.ReactNode; // optional override
  type?: ContactIconType; // 'email' | 'linkedin' | 'phone'
  compact?: boolean; // smaller sizes for dropdowns
  containerClassName?: string;
  showArrow?: boolean;
};

export function ContactMethodRow({ label, value, href, icon, type, compact = false, containerClassName = '', showArrow = true }: Props) {
  const iconWrapper = compact
    ? 'flex-shrink-0 w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-600'
    : 'flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600';

  const labelClass = compact ? 'text-[10px] uppercase text-slate-400' : 'text-xs uppercase text-slate-400';
  const valueClass = compact ? 'text-sm font-medium text-slate-900' : 'text-base font-medium text-slate-900';

  const Anchor: any = href.startsWith('http') ? 'a' : Link;

  // Choose icon: explicit `icon` prop wins, otherwise resolved from type
  let IconNode: React.ReactNode = icon ?? null;
  if (!IconNode && type) {
    const IconComponent = CONTACT_ICON_MAP[type];
    if (IconComponent) IconNode = <IconComponent className="text-slate-600" />;
  }

  return (
    <Anchor href={href} {...(Anchor === 'a' ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={containerClassName}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`${iconWrapper} group-hover:text-[#F4C430] transition-colors duration-200`}>{IconNode}</div>

          <div className="flex-1 min-w-0">
            <div className={labelClass}>{label}</div>
            <div className={valueClass + ' truncate'}>{value}</div>
          </div>
        </div>

        {showArrow ? (
          <div className="flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 ml-4">→</div>
        ) : null}
      </div>
    </Anchor>
  );
}

export default ContactMethodRow;
