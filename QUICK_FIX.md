# 🚨 Quick Fix Guide

## Problem: Getting Redirected to Org Pages + "Failed to fetch events"

### Root Causes:
1. **Backend not running** → API calls fail → SuperAdmin check fails → redirects to `/` → then to org
2. **User not marked as SuperAdmin in database** → `isSuperAdmin = false` → redirects
3. **API base URL misconfigured** → Can't reach backend

---

## ✅ Step-by-Step Fix

### 1. Check if Backend is Running

```bash
# Check if backend is running on port 4000
curl http://localhost:4000/health
# Should return: {"status":"ok","timestamp":"..."}
```

**If not running:**
```bash
# Start backend
cd backend-node
pnpm run dev
# Should see: "Server running on port 4000"
```

---

### 2. Check Frontend API Config

**Check `frontend/.env.local`:**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

**If file doesn't exist:**
```bash
cd frontend
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api" > .env.local
```

---

### 3. Make Sure You're a SuperAdmin

**Check if your user is SuperAdmin in database:**

```sql
-- Connect to your database and run:
SELECT * FROM super_admins WHERE user_id = 'YOUR_USER_ID';
```

**If no SuperAdmin record exists, create one:**

```sql
-- Replace 'YOUR_USER_ID' with your actual user ID
INSERT INTO super_admins (id, user_id, is_active, created_at)
VALUES (gen_random_uuid(), 'YOUR_USER_ID', true, NOW());
```

**Or use the seed script:**
```bash
cd backend-node
# Check seed.ts - might need to add SuperAdmin creation
```

---

### 4. Test the Flow

1. **Start Backend:**
   ```bash
   cd backend-node
   pnpm run dev
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   cd frontend
   pnpm run dev
   ```

3. **Login:**
   - Go to `http://localhost:3000/login`
   - Login with your SuperAdmin account

4. **Go Directly to Calendar:**
   - Navigate to: `http://localhost:3000/superadmin/calendar`
   - Should NOT redirect

---

## 🔍 Debug Checklist

- [ ] Backend running? → `curl http://localhost:4000/health`
- [ ] Frontend API URL set? → Check `frontend/.env.local`
- [ ] User is SuperAdmin? → Check database `super_admins` table
- [ ] Can reach backend? → Open browser console, check Network tab
- [ ] Cookies set? → Check Application → Cookies in DevTools

---

## 🐛 Common Issues

### Issue: "Failed to fetch events"
**Fix:** Backend not running or API URL wrong

### Issue: Redirects to `/orgs/...`
**Fix:** `isSuperAdmin = false` → Check database SuperAdmin record

### Issue: Redirects to `/login`
**Fix:** Not authenticated → Login first

---

## 🎯 Quick Test

1. Open browser console (F12)
2. Go to Network tab
3. Navigate to `/superadmin/calendar`
4. Check:
   - Is `/api/orgs/limit` called? What does it return?
   - Is `/api/superadmin/calendar/range` called? What error?
   - Check console for errors

This will tell us exactly what's failing! 🔍
