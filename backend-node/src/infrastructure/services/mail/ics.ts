import { DateTime } from 'luxon';

export interface IcsEventInput {
  uid: string;
  start: Date;
  end: Date;
  summary: string;
  description?: string;
  url?: string;
  organizerName?: string;
  organizerEmail?: string;
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function toIcsUtc(date: Date): string {
  return DateTime.fromJSDate(date).toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

/** Minimal RFC 5545 calendar file with a single event. */
export function generateIcs(input: IcsEventInput): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//arvinjaysoncastro.com//booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeText(input.uid)}`,
    `DTSTAMP:${toIcsUtc(new Date(Date.now()))}`,
    `DTSTART:${toIcsUtc(input.start)}`,
    `DTEND:${toIcsUtc(input.end)}`,
    `SUMMARY:${escapeText(input.summary)}`,
  ];
  if (input.description) lines.push(`DESCRIPTION:${escapeText(input.description)}`);
  if (input.url) lines.push(`URL:${escapeText(input.url)}`);
  if (input.organizerEmail) {
    lines.push(`ORGANIZER;CN=${escapeText(input.organizerName || input.organizerEmail)}:mailto:${input.organizerEmail}`);
  }
  lines.push('STATUS:CONFIRMED', 'END:VEVENT', 'END:VCALENDAR');
  return lines.join('\r\n');
}
