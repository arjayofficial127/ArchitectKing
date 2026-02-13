/**
 * Centralized color configuration for SuperAdmin Control OS
 */

export const calendarColors: Record<string, string> = {
  default: '#3B82F6', // blue-500
  scheduled: '#10B981', // emerald-500
  completed: '#6B7280', // gray-500
  cancelled: '#EF4444', // red-500
  open_slot: '#F59E0B', // amber-500
};

export const prospectStatusColors: Record<string, string> = {
  new: '#3B82F6', // blue-500
  contacted: '#8B5CF6', // violet-500
  meeting: '#F59E0B', // amber-500
  proposal: '#10B981', // emerald-500
  closed: '#6B7280', // gray-500
  lost: '#EF4444', // red-500
  other: '#9CA3AF', // gray-400
};

export const swimlaneColors: Record<string, string> = {
  // Default mapping - can be overridden per prospect
  'Lead': '#3B82F6', // blue-500
  'Qualified': '#8B5CF6', // violet-500
  'Proposal': '#F59E0B', // amber-500
  'Negotiation': '#10B981', // emerald-500
  'Closed': '#6B7280', // gray-500
  // Fallback for unknown swimlanes
  default: '#9CA3AF', // gray-400
};

/**
 * Get color for a swimlane, with fallback
 */
export function getSwimlaneColor(swimlane: string | null): string {
  if (!swimlane) return swimlaneColors.default;
  return swimlaneColors[swimlane] || swimlaneColors.default;
}

/**
 * Get color for a prospect status
 */
export function getProspectStatusColor(status: string): string {
  return prospectStatusColors[status] || prospectStatusColors.other;
}

/**
 * Get color for a calendar event status
 */
export function getCalendarEventColor(status: string, customColor?: string | null): string {
  if (customColor) return customColor;
  return calendarColors[status] || calendarColors.default;
}
