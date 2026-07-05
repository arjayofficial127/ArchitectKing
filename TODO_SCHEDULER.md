# Scheduler TODO (deferred items)

Backlog from the 2026-07-05 scheduler improvement session. Items 1–6 of the
roadmap were implemented; these remain.

## Calendar polish (cheap, high visibility)
- **"Now" indicator**: red current-time line across Day/Week/BiWeek grids (~20 min).
- **Auto-scroll on load**: grid opens at 00:00; scroll to ~07:00 or the first event instead.
- **Smarter overlap layout**: overlapping events cascade with a 5% offset; split column width evenly per overlap cluster (Google-style) instead.

## Calendar engineering (only if the scheduler becomes a product)
- **Touch support**: drag/move/resize interactions are mouse-event based (`useEventInteractions`); wire pointer/touch events for tablets & phones.
- **Accessibility**: keyboard navigation and screen-reader semantics for the event grid and context menu.
- **Month view interactivity**: event chips, click-to-open, drag between days (currently click-through only).

## 7. Unit tests for scheduling logic
Pure functions that carry the revenue path and deserve Jest coverage:
- `frontend/lib/utils/selectionOccurrences.ts` → `computeOccurrences` (per-day, continuous, split, buffer, DST edges, MAX_OCCURRENCES cap)
- `backend-node/.../calendar.service.ts` → `generateRecurringInstances` (daily/weekly/monthly, byDay, count/endDate limits)
- `backend-node/.../calendar.service.ts` → `materializeInstance` (valid/forged instance times, idempotency, already-booked conflict)

## 8. Atomic batch create
`CalendarService.createBatch` inserts sequentially. Validation is all up-front,
but a mid-batch DB failure could leave a partial series. Wrap the inserts in a
Drizzle transaction.

## 9. Config over constants
Hardcoded values that should come from app settings / env:
- 1-hour minimum booking notice (`MIN_NOTICE_MS` in `backend-node/src/api/routes/public/schedule.routes.ts`)
- 14-day public schedule window (`WINDOW_DAYS` in `frontend/app/schedule/page.tsx`)
- Default timezone `Asia/Manila` scattered in superadmin calendar UI

## 10. Cleanup
- `backend-node/.env` has TWO `DATABASE_URL` lines (Docker + Neon; the last one wins → Neon). Delete the unused line.
- Remove `[TEST]`-titled calendar events, the test booking (`test-visitor@example.com`), and its entity row from Neon.
- Series title edit: renaming one batch event could offer "rename whole series" (batch-wide PATCH is currently coerced to single).
- Series-level drag for recurring events (dragging one occurrence only moves that occurrence; rebasing the whole series via drag is deferred — use the Edit modal's "Edit Series" instead).
