ALTER TABLE "calendar_events" ADD COLUMN "batch_id" uuid;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_events_batch_id_idx" ON "calendar_events" ("batch_id");