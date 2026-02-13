/**
 * Drizzle ORM schema definitions
 */
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
  integer,
  primaryKey,
  unique,
  index,
  bigint,
  jsonb,
  numeric,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// User table
export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  defaultOrgId: uuid('default_org_id').references(() => orgsTable.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  defaultOrgIdx: index('users_default_org_idx').on(table.defaultOrgId),
}));

// SuperAdmin table
export const superAdminsTable = pgTable('super_admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .unique(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Org table
export const orgsTable = pgTable('orgs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  slugIdx: index('orgs_slug_idx').on(table.slug),
}));

// Role table
export const rolesTable = pgTable('roles', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  code: varchar('code', { length: 50 }).notNull().unique(),
});

// OrgUser table
export const orgUsersTable = pgTable('org_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  orgUserIdx: index('org_users_org_user_idx').on(table.orgId, table.userId),
  uniqueOrgUser: unique('org_users_org_user_unique').on(table.orgId, table.userId),
}));

// OrgUserRole table
export const orgUserRolesTable = pgTable('org_user_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgUserId: uuid('org_user_id')
    .notNull()
    .references(() => orgUsersTable.id, { onDelete: 'cascade' }),
  roleId: integer('role_id')
    .notNull()
    .references(() => rolesTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  orgUserRoleIdx: index('org_user_roles_org_user_idx').on(table.orgUserId),
  uniqueOrgUserRole: unique('org_user_roles_org_user_role_unique').on(table.orgUserId, table.roleId),
}));

// AppSetting table
export const appSettingsTable = pgTable('app_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Post table
export const postsTable = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  authorUserId: uuid('author_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 500 }).notNull(),
  body: text('body').notNull(),
  isPublished: boolean('is_published').notNull().default(true),
  objectKey: text('object_key'),
  previewObjectKey: text('preview_object_key'),
  payloadSize: integer('payload_size'),
  payloadHash: text('payload_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  orgIdx: index('posts_org_idx').on(table.orgId),
  authorIdx: index('posts_author_idx').on(table.authorUserId),
}));

// Post Attachment table
export const attachmentsTable = pgTable('post_attachments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  postId: uuid('post_id')
    .notNull()
    .references(() => postsTable.id, { onDelete: 'cascade' }),
  authorUserId: uuid('author_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(), // 'image' | 'file' | 'video' | 'link'
  url: text('url').notNull(),
  fileName: text('file_name'),
  mimeType: text('mime_type'),
  sizeBytes: bigint('size_bytes', { mode: 'number' }),
  label: varchar('label', { length: 255 }),
  order: integer('order').notNull().default(0),
  fileId: uuid('file_id').references((): any => orgFilesTable.id, { onDelete: 'set null' }), // Reference to org_files if attached from library
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  postIdx: index('post_attachments_post_idx').on(table.postId),
  orgIdx: index('post_attachments_org_idx').on(table.orgId),
  authorIdx: index('post_attachments_author_idx').on(table.authorUserId),
  fileIdx: index('post_attachments_file_idx').on(table.fileId),
}));

// Post Comment table
export const commentsTable = pgTable('post_comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  postId: uuid('post_id')
    .notNull()
    .references(() => postsTable.id, { onDelete: 'cascade' }),
  authorUserId: uuid('author_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  objectKey: text('object_key'),
  previewObjectKey: text('preview_object_key'),
  payloadSize: integer('payload_size'),
  payloadHash: text('payload_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  postIdx: index('post_comments_post_idx').on(table.postId),
  authorIdx: index('post_comments_author_idx').on(table.authorUserId),
}));

// PostLike table
export const postLikesTable = pgTable('post_likes', {
  postId: uuid('post_id')
    .notNull()
    .references(() => postsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  postUserIdx: index('post_likes_post_user_idx').on(table.postId, table.userId),
  uniquePostUser: primaryKey({ columns: [table.postId, table.userId] }),
}));

// Collections table (V1.1 Future-Proof)
export const collectionsTable = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 50 }),
  visibility: varchar('visibility', { length: 20 }).notNull().default('private'), // 'private' | 'org' | 'public'
  createdByUserId: uuid('created_by_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  // V1.1 Future-Proofing fields
  tableCode: varchar('table_code', { length: 255 }).notNull().unique(),
  storageMode: varchar('storage_mode', { length: 50 }).notNull().default('single_table'), // 'single_table' | 'dedicated_table'
  physicalTable: varchar('physical_table', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  orgSlugIdx: index('collections_org_slug_idx').on(table.orgId, table.slug),
  uniqueOrgSlug: unique('collections_org_slug_unique').on(table.orgId, table.slug),
  tableCodeIdx: index('collections_table_code_idx').on(table.tableCode),
}));

// CollectionFields table
export const collectionFieldsTable = pgTable('collection_fields', {
  id: uuid('id').defaultRandom().primaryKey(),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collectionsTable.id, { onDelete: 'cascade' }),
  key: varchar('key', { length: 255 }).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'text' | 'number' | 'boolean' | 'date' | 'select' | 'multi_select'
  isRequired: boolean('is_required').notNull().default(false),
  order: integer('order').notNull().default(0),
  config: jsonb('config').default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  collectionIdx: index('collection_fields_collection_idx').on(table.collectionId),
  uniqueCollectionKey: unique('collection_fields_collection_key_unique').on(table.collectionId, table.key),
}));

// Collection Records table (V1.1 Shared Table)
export const recordsTable = pgTable('collection_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collectionsTable.id, { onDelete: 'cascade' }),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  data: jsonb('data').notNull(),
  createdByUserId: uuid('created_by_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  objectKey: text('object_key'),
  previewObjectKey: text('preview_object_key'),
  payloadSize: integer('payload_size'),
  payloadHash: text('payload_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  collectionIdx: index('collection_records_collection_idx').on(table.collectionId),
  orgIdx: index('collection_records_org_idx').on(table.orgId),
  collectionOrgIdx: index('collection_records_collection_org_idx').on(table.collectionId, table.orgId),
}));

// Teams table
export const teamsTable = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  leadUserId: uuid('lead_user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  orgIdx: index('teams_org_idx').on(table.orgId),
  uniqueOrgName: unique('teams_org_name_unique').on(table.orgId, table.name),
}));

// TeamMembers table
export const teamMembersTable = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id')
    .notNull()
    .references(() => teamsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).notNull().default('member'), // 'member' | 'lead'
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
}, (table) => ({
  teamIdx: index('team_members_team_idx').on(table.teamId),
  userIdx: index('team_members_user_idx').on(table.userId),
  uniqueTeamUser: unique('team_members_team_user_unique').on(table.teamId, table.userId),
}));

// JoinCodes table (separate from orgs)
export const joinCodesTable = pgTable('join_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 50 }).notNull().unique(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').notNull().default(0),
  allowedDomains: jsonb('allowed_domains').$type<string[]>(),
  isActive: boolean('is_active').notNull().default(false),
  expiresAt: timestamp('expires_at'),
  defaultRoleId: integer('default_role_id').references(() => rolesTable.id),
  defaultTeamId: uuid('default_team_id').references(() => teamsTable.id, { onDelete: 'set null' }),
  requiresApproval: boolean('requires_approval').notNull().default(false),
  welcomeMessage: text('welcome_message'),
  visibility: varchar('visibility', { length: 20 }).notNull().default('private'), // 'private' | 'public'
  notifyAdminsOnJoin: boolean('notify_admins_on_join').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  codeIdx: index('join_codes_code_idx').on(table.code),
  orgIdx: index('join_codes_org_idx').on(table.orgId),
}));

// JoinRequests table (for approval workflow)
export const joinRequestsTable = pgTable('join_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  joinCodeId: uuid('join_code_id').references(() => joinCodesTable.id, { onDelete: 'set null' }),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // 'pending' | 'approved' | 'rejected'
  message: text('message'), // Optional message from user
  requestedAt: timestamp('requested_at').notNull().defaultNow(),
  reviewedAt: timestamp('reviewed_at'),
  reviewedByUserId: uuid('reviewed_by_user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  rejectionReason: text('rejection_reason'),
}, (table) => ({
  orgIdx: index('join_requests_org_idx').on(table.orgId),
  userIdx: index('join_requests_user_idx').on(table.userId),
  statusIdx: index('join_requests_status_idx').on(table.status),
  uniqueOrgUserPending: unique('join_requests_org_user_pending_unique').on(table.orgId, table.userId, table.status),
}));

// Notifications table
export const notificationsTable = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(), // 'join_request', 'join_approved', 'join_rejected', 'member_joined', etc.
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  relatedEntityType: varchar('related_entity_type', { length: 50 }), // 'org', 'team', 'post', 'join_request', etc.
  relatedEntityId: uuid('related_entity_id'),
  isRead: boolean('is_read').notNull().default(false),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdx: index('notifications_user_idx').on(table.userId),
  isReadIdx: index('notifications_is_read_idx').on(table.isRead),
  createdAtIdx: index('notifications_created_at_idx').on(table.createdAt),
  userReadIdx: index('notifications_user_read_idx').on(table.userId, table.isRead),
}));

// Org Files table (File Management App - Dropbox-like)
export const orgFilesTable = pgTable('org_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => orgsTable.id, { onDelete: 'cascade' }),
  ownerUserId: uuid('owner_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  storageProvider: varchar('storage_provider', { length: 50 }).notNull().default('supabase'), // 'supabase' | 'r2' | 'noop'
  storageKey: text('storage_key').notNull(), // The identifier used by IFileStorageService
  url: text('url').notNull(), // Computed public/base url OR resolved by service
  fileName: text('file_name').notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
  checksum: text('checksum'), // Optional future
  visibility: varchar('visibility', { length: 20 }).notNull().default('private'), // 'private' | 'org' | 'public' | 'users'
  objectKey: text('object_key'),
  previewObjectKey: text('preview_object_key'),
  payloadSize: integer('payload_size'),
  payloadHash: text('payload_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  orgIdx: index('org_files_org_idx').on(table.orgId),
  ownerIdx: index('org_files_owner_idx').on(table.ownerUserId),
  visibilityIdx: index('org_files_visibility_idx').on(table.visibility),
  orgVisibilityIdx: index('org_files_org_visibility_idx').on(table.orgId, table.visibility),
}));

// Org File Users table (join table for visibility='users')
export const orgFileUsersTable = pgTable('org_file_users', {
  fileId: uuid('file_id')
    .notNull()
    .references(() => orgFilesTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  fileUserIdx: index('org_file_users_file_user_idx').on(table.fileId, table.userId),
  uniqueFileUser: unique('org_file_users_file_user_unique').on(table.fileId, table.userId),
}));

// Org File Links table (optional for public share link codes)
export const orgFileLinksTable = pgTable('org_file_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileId: uuid('file_id')
    .notNull()
    .references(() => orgFilesTable.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 50 }).notNull().unique(), // Short code
  createdAt: timestamp('created_at').notNull().defaultNow(),
  revokedAt: timestamp('revoked_at'),
}, (table) => ({
  codeIdx: index('org_file_links_code_idx').on(table.code),
  fileIdx: index('org_file_links_file_idx').on(table.fileId),
}));

// ============================================
// SUPERADMIN CONTROL OS SCHEMA
// Phase 1 - Core Schema (Additive Only)
// ============================================

// Enums
export const calendarEventStatusEnum = pgEnum('calendar_event_status', [
  'scheduled',
  'completed',
  'cancelled',
  'open_slot',
]);

export const calendarEventVisibilityEnum = pgEnum('calendar_event_visibility', [
  'private',
  'public_open',
]);

export const prospectStatusEnum = pgEnum('prospect_status', [
  'new',
  'contacted',
  'meeting',
  'proposal',
  'closed',
  'lost',
  'other',
]);

export const entityTypeEnum = pgEnum('entity_type', [
  'person',
  'company',
  'event',
  'other',
]);

export const notificationTypeEnum = pgEnum('notification_type', [
  'booking_request',
  'system',
  'reminder',
]);

// 1. Calendar Events table
export const calendarEventsTable = pgTable('calendar_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  ownerUserId: uuid('owner_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  agenda: text('agenda'),
  notes: text('notes'),
  startDatetime: timestamp('start_datetime', { withTimezone: true }).notNull(),
  endDatetime: timestamp('end_datetime', { withTimezone: true }).notNull(),
  timezone: varchar('timezone', { length: 100 }).notNull().default('Asia/Manila'),
  status: calendarEventStatusEnum('status').notNull(),
  visibility: calendarEventVisibilityEnum('visibility').notNull(),
  recurrenceRule: jsonb('recurrence_rule'),
  recurrenceParentId: uuid('recurrence_parent_id').references((): any => calendarEventsTable.id, { onDelete: 'cascade' }),
  color: varchar('color', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  ownerUserIdIdx: index('calendar_events_owner_user_id_idx').on(table.ownerUserId),
  startDatetimeIdx: index('calendar_events_start_datetime_idx').on(table.startDatetime),
  statusIdx: index('calendar_events_status_idx').on(table.status),
  recurrenceParentIdIdx: index('calendar_events_recurrence_parent_id_idx').on(table.recurrenceParentId),
}));

// 2. Entities table
export const entitiesTable = pgTable('entities', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: entityTypeEnum('type').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 100 }),
  website: varchar('website', { length: 255 }),
  imageUrl: varchar('image_url', { length: 500 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  typeIdx: index('entities_type_idx').on(table.type),
  nameIdx: index('entities_name_idx').on(table.name),
}));

// 3. Booking Requests table
export const bookingRequestsTable = pgTable('booking_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  calendarEventId: uuid('calendar_event_id')
    .notNull()
    .references(() => calendarEventsTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message'),
  timezoneAtBooking: varchar('timezone_at_booking', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('confirmed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  calendarEventIdIdx: index('booking_requests_calendar_event_id_idx').on(table.calendarEventId),
  createdAtIdx: index('booking_requests_created_at_idx').on(table.createdAt),
}));

// 4. Prospects table
export const prospectsTable = pgTable('prospects', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: varchar('type', { length: 50 }).notNull(), // 'person' | 'company'
  name: varchar('name', { length: 255 }).notNull(),
  targetBudget: numeric('target_budget', { precision: 19, scale: 4 }),
  status: prospectStatusEnum('status').notNull(),
  swimlane: varchar('swimlane', { length: 100 }),
  tags: text('tags').array().default(sql`'{}'`),
  notes: text('notes'),
  websiteUrl: varchar('website_url', { length: 500 }),
  imageUrl: varchar('image_url', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  statusIdx: index('prospects_status_idx').on(table.status),
  swimlaneIdx: index('prospects_swimlane_idx').on(table.swimlane),
}));

// 5. Prospect Meetings junction table
export const prospectMeetingsTable = pgTable('prospect_meetings', {
  id: uuid('id').defaultRandom().primaryKey(),
  prospectId: uuid('prospect_id')
    .notNull()
    .references(() => prospectsTable.id, { onDelete: 'cascade' }),
  calendarEventId: uuid('calendar_event_id')
    .notNull()
    .references(() => calendarEventsTable.id, { onDelete: 'cascade' }),
}, (table) => ({
  uniqueProspectMeeting: unique('prospect_meetings_prospect_calendar_unique').on(table.prospectId, table.calendarEventId),
}));

// 6. Notifications table (SuperAdmin scope)
export const superAdminNotificationsTable = pgTable('super_admin_notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: notificationTypeEnum('type').notNull(),
  relatedId: uuid('related_id'),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  readIdx: index('super_admin_notifications_read_idx').on(table.read),
  createdAtIdx: index('super_admin_notifications_created_at_idx').on(table.createdAt),
}));

// 7. Folders table
export const foldersTable = pgTable('folders', {
  id: uuid('id').defaultRandom().primaryKey(),
  parentFolderId: uuid('parent_folder_id').references((): any => foldersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  ownerUserId: uuid('owner_user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  ownerUserIdIdx: index('folders_owner_user_id_idx').on(table.ownerUserId),
  parentFolderIdIdx: index('folders_parent_folder_id_idx').on(table.parentFolderId),
}));

// 8. Files table
export const superAdminFilesTable = pgTable('super_admin_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  folderId: uuid('folder_id').references(() => foldersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 20 }).notNull(), // 'txt' | 'md' | 'rtf'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  folderIdIdx: index('super_admin_files_folder_id_idx').on(table.folderId),
}));

// ============================================
// TYPE EXPORTS FOR SERVICES LAYER
// ============================================

// Calendar Events
export type CalendarEvent = InferSelectModel<typeof calendarEventsTable>;
export type NewCalendarEvent = InferInsertModel<typeof calendarEventsTable>;

// Entities
export type Entity = InferSelectModel<typeof entitiesTable>;
export type NewEntity = InferInsertModel<typeof entitiesTable>;

// Booking Requests
export type BookingRequest = InferSelectModel<typeof bookingRequestsTable>;
export type NewBookingRequest = InferInsertModel<typeof bookingRequestsTable>;

// Prospects
export type Prospect = InferSelectModel<typeof prospectsTable>;
export type NewProspect = InferInsertModel<typeof prospectsTable>;

// Prospect Meetings
export type ProspectMeeting = InferSelectModel<typeof prospectMeetingsTable>;
export type NewProspectMeeting = InferInsertModel<typeof prospectMeetingsTable>;

// SuperAdmin Notifications
export type SuperAdminNotification = InferSelectModel<typeof superAdminNotificationsTable>;
export type NewSuperAdminNotification = InferInsertModel<typeof superAdminNotificationsTable>;

// Folders
export type Folder = InferSelectModel<typeof foldersTable>;
export type NewFolder = InferInsertModel<typeof foldersTable>;

// SuperAdmin Files
export type SuperAdminFile = InferSelectModel<typeof superAdminFilesTable>;
export type NewSuperAdminFile = InferInsertModel<typeof superAdminFilesTable>;
