'use client';

import { useState } from 'react';
import type { Prospect } from '@/lib/api/superadmin';
import { getProspectStatusColor } from '@/config/superadminColors';
import MeetingLinkModal from './MeetingLinkModal';

interface ProspectCardProps {
  prospect: Prospect;
  onEdit: (prospect: Prospect) => void;
  onDelete: (id: string) => void;
  onDragStart?: (e: React.DragEvent, prospect: Prospect) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  draggable?: boolean;
}

export function ProspectCard({
  prospect,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  draggable = false,
}: ProspectCardProps) {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const statusColor = getProspectStatusColor(prospect.status);

  const formatBudget = (budget: number | null): string => {
    if (!budget) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(budget);
  };

  return (
    <>
      <div
        draggable={draggable}
        onDragStart={draggable && onDragStart ? (e) => onDragStart(e, prospect) : undefined}
        onDragEnd={draggable && onDragEnd ? onDragEnd : undefined}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{prospect.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500 capitalize">{prospect.type}</span>
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  backgroundColor: `${statusColor}20`,
                  color: statusColor,
                }}
              >
                {prospect.status}
              </span>
              {prospect.swimlane && (
                <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                  {prospect.swimlane}
                </span>
              )}
            </div>
          </div>
        </div>

        {prospect.targetBudget !== null && (
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Budget:</span> {formatBudget(prospect.targetBudget)}
          </div>
        )}

        {prospect.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {prospect.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {prospect.websiteUrl && (
          <div className="mb-2">
            <a
              href={prospect.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Visit Website →
            </a>
          </div>
        )}

        {prospect.notes && (
          <div className="text-sm text-gray-600 mb-3 line-clamp-2">
            {prospect.notes}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => setShowMeetingModal(true)}
            className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Meetings
          </button>
          <button
            onClick={() => onEdit(prospect)}
            className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this prospect?')) {
                onDelete(prospect.id);
              }
            }}
            className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {showMeetingModal && (
        <MeetingLinkModal
          prospect={prospect}
          onClose={() => setShowMeetingModal(false)}
        />
      )}
    </>
  );
}
