DO $$ BEGIN
 CREATE TYPE "calendar_event_status" AS ENUM('scheduled', 'completed', 'cancelled', 'open_slot');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "calendar_event_visibility" AS ENUM('private', 'public_open');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "entity_type" AS ENUM('person', 'company', 'event', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "notification_type" AS ENUM('booking_request', 'system', 'reminder');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "prospect_status" AS ENUM('new', 'contacted', 'meeting', 'proposal', 'closed', 'lost', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"calendar_event_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text,
	"timezone_at_booking" varchar(100),
	"status" varchar(50) DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"agenda" text,
	"notes" text,
	"start_datetime" timestamp with time zone NOT NULL,
	"end_datetime" timestamp with time zone NOT NULL,
	"timezone" varchar(100) DEFAULT 'Asia/Manila' NOT NULL,
	"status" "calendar_event_status" NOT NULL,
	"visibility" "calendar_event_visibility" NOT NULL,
	"recurrence_rule" jsonb,
	"recurrence_parent_id" uuid,
	"color" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "entity_type" NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(100),
	"website" varchar(255),
	"image_url" varchar(500),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_folder_id" uuid,
	"name" varchar(255) NOT NULL,
	"owner_user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prospect_meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prospect_id" uuid NOT NULL,
	"calendar_event_id" uuid NOT NULL,
	CONSTRAINT "prospect_meetings_prospect_calendar_unique" UNIQUE("prospect_id","calendar_event_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prospects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"target_budget" numeric(19, 4),
	"status" "prospect_status" NOT NULL,
	"swimlane" varchar(100),
	"tags" text[] DEFAULT '{}',
	"notes" text,
	"website_url" varchar(500),
	"image_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "super_admin_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"folder_id" uuid,
	"name" varchar(255) NOT NULL,
	"file_type" varchar(20) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "super_admin_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "notification_type" NOT NULL,
	"related_id" uuid,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "booking_requests_calendar_event_id_idx" ON "booking_requests" ("calendar_event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "booking_requests_created_at_idx" ON "booking_requests" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_events_owner_user_id_idx" ON "calendar_events" ("owner_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_events_start_datetime_idx" ON "calendar_events" ("start_datetime");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_events_status_idx" ON "calendar_events" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "calendar_events_recurrence_parent_id_idx" ON "calendar_events" ("recurrence_parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "entities_type_idx" ON "entities" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "entities_name_idx" ON "entities" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "folders_owner_user_id_idx" ON "folders" ("owner_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "folders_parent_folder_id_idx" ON "folders" ("parent_folder_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prospects_status_idx" ON "prospects" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prospects_swimlane_idx" ON "prospects" ("swimlane");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "super_admin_files_folder_id_idx" ON "super_admin_files" ("folder_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "super_admin_notifications_read_idx" ON "super_admin_notifications" ("read");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "super_admin_notifications_created_at_idx" ON "super_admin_notifications" ("created_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_calendar_event_id_calendar_events_id_fk" FOREIGN KEY ("calendar_event_id") REFERENCES "calendar_events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_recurrence_parent_id_calendar_events_id_fk" FOREIGN KEY ("recurrence_parent_id") REFERENCES "calendar_events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_folder_id_folders_id_fk" FOREIGN KEY ("parent_folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "folders" ADD CONSTRAINT "folders_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prospect_meetings" ADD CONSTRAINT "prospect_meetings_prospect_id_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "prospects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prospect_meetings" ADD CONSTRAINT "prospect_meetings_calendar_event_id_calendar_events_id_fk" FOREIGN KEY ("calendar_event_id") REFERENCES "calendar_events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "super_admin_files" ADD CONSTRAINT "super_admin_files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
