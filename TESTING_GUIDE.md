# 🧪 Testing Guide - SuperAdmin Control OS Features

## 🚀 Quick Start

### Step 1: Start Database (Choose One)

**Option A: Docker (Recommended)**
```bash
npm run db:up
```

**Option B: Neon (Cloud)**
- Get your Neon connection string
- Add to `backend-node/.env`:
  ```
  DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname
  ```

**Option C: Local Postgres**
- Install Postgres locally
- Create database
- Set `DATABASE_URL` in `backend-node/.env`

### Step 2: Setup Backend Environment

```bash
cd backend-node
cp ".env copy.example" .env
# Edit .env with your DATABASE_URL and secrets
```

### Step 3: Run Database Migrations

```bash
cd backend-node
pnpm run db:migrate
```

### Step 4: Start Development Servers

**From root directory:**
```bash
# Start both frontend and backend
npm run dev

# OR start separately:
npm run dev:backend  # Backend on http://localhost:4000
npm run dev:frontend # Frontend on http://localhost:3000
```

---

## 📍 Where to Find What We Built

### 1. **SuperAdmin Calendar** 📅
**URL:** `http://localhost:3000/superadmin/calendar`

**What to Test:**
- ✅ View modes: Day, Week, Bi-Weekly, Month, Year
- ✅ Click empty slot → Create event modal
- ✅ Drag across time blocks → Auto-create event
- ✅ Click event → Edit modal (single vs series)
- ✅ Open Slot Mode toggle
- ✅ Recurring events (daily/weekly/monthly)
- ✅ Date navigation (prev/next/today)
- ✅ Timezone display (Asia/Manila)

**Navigation:** 
- Login as SuperAdmin
- Click "Super Admin" dropdown → "Calendar" (or go directly to `/superadmin/calendar`)

---

### 2. **Public Booking System** 🌐
**URL:** `http://localhost:3000/schedule`

**What to Test:**
- ✅ Public access (no login required!)
- ✅ Timezone auto-detection
- ✅ Weekly view with available slots
- ✅ Click "Book" → Booking modal
- ✅ Submit booking → Confirmation screen
- ✅ Timezone badge (if not Asia/Manila)

**Note:** You need to create "open slots" in SuperAdmin Calendar first!

**How to Create Open Slots:**
1. Go to `/superadmin/calendar`
2. Toggle "Open Slot Mode" ON
3. Create events → They become bookable slots
4. Go to `/schedule` to see them

---

### 3. **Prospect Intelligence System** 💼
**URL:** `http://localhost:3000/superadmin/prospects`

**What to Test:**
- ✅ List view vs Swimlane board view
- ✅ Add Prospect button → Modal
- ✅ Drag & drop prospects between swimlanes
- ✅ Status filter dropdown
- ✅ Tag filter multi-select
- ✅ Prospect card: Edit, Delete, Meetings
- ✅ Right-click folder to rename
- ✅ Color-coded status badges

**Navigation:**
- SuperAdmin sidebar → "Prospects"

---

### 4. **Knowledge Vault (Files)** 📁
**URL:** `http://localhost:3000/superadmin/files`

**What to Test:**
- ✅ Left panel: Folder tree
- ✅ "+ Folder" button → Create folder
- ✅ "+ File" button → Create file (txt/md/rtf)
- ✅ Click folder → Select it
- ✅ Click file → Load in editor
- ✅ **TXT files:** Textarea editor + Save button
- ✅ **MD files:** Split view (editor + preview)
- ✅ **RTF files:** View-only with notice
- ✅ Right-click folder → Rename
- ✅ Delete folder/file with confirmation

**Note:** Backend API is stubbed - you'll see "Files API - Coming soon" until backend routes are implemented.

**Navigation:**
- SuperAdmin sidebar → "Files"

---

### 5. **SuperAdmin Dashboard** 📊
**URL:** `http://localhost:3000/superadmin/dashboard`

**What to Test:**
- ✅ Recent bookings display
- ✅ Upcoming events
- ✅ Overdue events
- ✅ Urgent prospects

**Navigation:**
- SuperAdmin sidebar → "Dashboard"

---

### 6. **Notifications** 🔔
**URL:** `http://localhost:3000/superadmin/notifications`

**What to Test:**
- ✅ List of notifications
- ✅ Mark as read
- ✅ Filter unread only

**Navigation:**
- SuperAdmin sidebar → "Notifications"

---

## 🔐 Authentication Setup

### To Access SuperAdmin Routes:

1. **Register a SuperAdmin User:**
   ```bash
   # Backend should have a way to create SuperAdmin
   # Check backend-node/src/infrastructure/db/drizzle/seed.ts
   ```

2. **Or Login:**
   - Go to `http://localhost:3000/login`
   - Login with SuperAdmin credentials
   - You'll be redirected to dashboard

3. **SuperAdmin Check:**
   - The layout at `/superadmin/layout.tsx` uses `useRequireSuperAdmin()`
   - If not SuperAdmin, redirects to homepage
   - If not logged in, redirects to login

---

## 🧪 Testing Checklist

### Calendar System ✅
- [ ] Create single event
- [ ] Create recurring event (weekly)
- [ ] Edit single occurrence
- [ ] Edit entire series
- [ ] Delete single occurrence
- [ ] Delete entire series
- [ ] Switch between Day/Week/Month/Year views
- [ ] Create open slot
- [ ] Drag to create event

### Public Booking ✅
- [ ] Visit `/schedule` (no login)
- [ ] See timezone badge
- [ ] View available slots
- [ ] Book a slot
- [ ] See confirmation screen
- [ ] Verify slot converted to scheduled (in SuperAdmin calendar)

### Prospects ✅
- [ ] Add new prospect
- [ ] Edit prospect
- [ ] Delete prospect
- [ ] Switch List ↔ Swimlane view
- [ ] Drag prospect to new swimlane
- [ ] Filter by status
- [ ] Filter by tags
- [ ] Link meeting to prospect

### Knowledge Vault ✅
- [ ] Create folder
- [ ] Create file (txt)
- [ ] Create file (md)
- [ ] Create file (rtf)
- [ ] Edit txt file
- [ ] Edit md file (see preview)
- [ ] View rtf file (read-only)
- [ ] Rename folder
- [ ] Delete folder
- [ ] Delete file

---

## ⚠️ Known Limitations

1. **Files API Stubbed:**
   - Backend routes return "Coming soon"
   - Frontend UI is complete, but won't persist data yet

2. **Meeting Linking:**
   - Can link meetings, but fetching linked meetings endpoint not implemented
   - Shows empty list for now

3. **Markdown Preview:**
   - Basic text display (not rendered HTML)
   - Consider adding `react-markdown` or similar

4. **RTF Viewer:**
   - Shows raw content
   - Consider adding RTF parser library

---

## 🐛 Troubleshooting

### "Failed to load dashboard data"
- **Cause:** Backend not running or database not connected
- **Fix:** Start backend with `npm run dev:backend` and ensure `DATABASE_URL` is set

### "Redirected to login"
- **Cause:** Not authenticated
- **Fix:** Login first at `/login`

### "Redirected to homepage"
- **Cause:** User is not SuperAdmin
- **Fix:** Ensure user has SuperAdmin role in database

### Calendar shows no events
- **Cause:** No events created yet
- **Fix:** Create events in SuperAdmin calendar

### Schedule page shows no slots
- **Cause:** No open slots created
- **Fix:** 
  1. Go to `/superadmin/calendar`
  2. Toggle "Open Slot Mode"
  3. Create events (they become bookable)

### Files page shows "Coming soon"
- **Cause:** Backend API routes are stubbed
- **Fix:** Backend implementation needed (Phase 2 backend work)

---

## 🎯 Quick Test Flow

1. **Start everything:**
   ```bash
   npm run db:up        # Start Postgres
   npm run dev          # Start frontend + backend
   ```

2. **Login as SuperAdmin:**
   - Go to `http://localhost:3000/login`
   - Login with SuperAdmin account

3. **Test Calendar:**
   - Go to `/superadmin/calendar`
   - Create a few events
   - Try different views

4. **Test Public Booking:**
   - Go to `/superadmin/calendar`
   - Toggle "Open Slot Mode"
   - Create an open slot
   - Open new incognito window
   - Go to `/schedule`
   - Book the slot

5. **Test Prospects:**
   - Go to `/superadmin/prospects`
   - Add a prospect
   - Try drag & drop between swimlanes

6. **Test Files:**
   - Go to `/superadmin/files`
   - Create folder
   - Create file
   - Edit file

---

## 📝 Notes

- All frontend features are **fully implemented**
- Backend APIs for **Calendar, Prospects, Notifications** are implemented
- Backend APIs for **Files** are **stubbed** (return "Coming soon")
- All builds pass ✅
- All TypeScript types are correct ✅

Enjoy testing! 🚀
