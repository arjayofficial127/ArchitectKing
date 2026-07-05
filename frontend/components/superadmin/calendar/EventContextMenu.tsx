'use client';

import { useEffect } from 'react';
import type { CalendarEvent } from '@/lib/api/superadmin';
import type { EventContextMenuState } from '@/hooks/superadmin/useEventInteractions';

interface EventContextMenuProps {
  menu: EventContextMenuState | null;
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDuplicate: (event: CalendarEvent) => void;
  onToggleOpenSlot: (event: CalendarEvent) => void;
  onDelete: (event: CalendarEvent) => void;
}

export function EventContextMenu({
  menu,
  onClose,
  onEdit,
  onDuplicate,
  onToggleOpenSlot,
  onDelete,
}: EventContextMenuProps) {
  useEffect(() => {
    if (!menu) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menu, onClose]);

  if (!menu) return null;

  const { event } = menu;
  const isOpenSlot = event.status === 'open_slot';

  const item = (label: string, action: () => void, danger = false) => (
    <button
      type="button"
      onClick={() => {
        onClose();
        action();
      }}
      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }}>
      <div
        className="absolute min-w-[190px] rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
        style={{
          left: Math.min(menu.x, typeof window !== 'undefined' ? window.innerWidth - 210 : menu.x),
          top: Math.min(menu.y, typeof window !== 'undefined' ? window.innerHeight - 180 : menu.y),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 px-4 py-2">
          <p className="truncate text-xs font-semibold text-gray-900">{event.title}</p>
        </div>
        {item('Edit', () => onEdit(event))}
        {item('Duplicate', () => onDuplicate(event))}
        {item(isOpenSlot ? 'Convert to private event' : 'Convert to open slot', () => onToggleOpenSlot(event))}
        {item('Delete', () => onDelete(event), true)}
      </div>
    </div>
  );
}
