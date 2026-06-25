# Real-Time Product Updates - Test Guide

## Setup
1. **Backend running** on http://localhost:5000
2. **Frontend running** on http://localhost:5175 (or check terminal for port)
3. **Admin account created** (see ADMIN_SETUP.md)

---

## Testing Real-Time Updates

### Test 1: Add Product as Admin
1. **Open 2 browser windows side-by-side:**
   - Window 1: http://localhost:5175 (regular user view)
   - Window 2: Admin dashboard (login as admin → click Admin link)

2. **In Window 2 (Admin):**
   - Click "+ Add New Product"
   - Fill in details:
     - Name: "Test Product"
     - Price: 99.99
     - Stock: 50
     - Category: "Test"
     - Sizes: S, M, L
     - Image URL: Any Unsplash URL
     - Description: "This is a test"
   - Click "Add Product"

3. **Watch Window 1 (User):**
   - Wait 10 seconds maximum
   - "Test Product" should appear on home page!
   - Go to Catalog → See "Test Product" there too

---

### Test 2: Edit Product as Admin
1. **In Window 2 (Admin):**
   - Find any product
   - Click the Edit (pencil) icon
   - Change the price: $100 → $200
   - Click "Update Product"

2. **Watch Window 1 (User):**
   - Within 10 seconds, product price updates!

---

### Test 3: Delete Product as Admin
1. **In Window 2 (Admin):**
   - Find the "Test Product" you created
   - Click Delete (trash icon)
   - Confirm deletion

2. **Watch Window 1 (User):**
   - Within 10 seconds, "Test Product" disappears!

---

### Test 4: Instant Update on Tab Focus
1. **Admin makes a change** (add/edit/delete)
2. **Switch to User window**
   - If it was showing a different app/tab, switch back to this window
   - Product updates instantly! (doesn't wait 10 seconds)

---

## How the Updates Work

```
Timeline of Real-Time Updates:
┌─────────────────────────────────────────┐
│ Admin adds product                      │
│ ↓                                        │
│ Saved to database instantly             │
│                                         │
│ Regular Users:                          │
│ - Auto-fetch every 10 seconds          │
│ - OR instantly if they switch tabs     │
│ ↓                                        │
│ Home page + Catalog updates             │
│ - No manual refresh needed              │
│ - New product appears in real-time      │
└─────────────────────────────────────────┘
```

---

## Update Refresh Triggers

1. **Page Load** - Fetches products when you first open home/catalog
2. **Every 10 Seconds** - Auto-refresh while page is active
3. **Tab Focus** - Instant refresh when you switch back to browser
4. **Manual Refetch** - Available via `refetch()` function (internal)

---

## What Updates Appear In Real-Time

✅ **NEW products added by admin**
✅ **DELETED products disappear**
✅ **EDITED product details update**
✅ **Price changes**
✅ **Stock changes**
✅ **Description updates**
✅ **Image URL changes**

---

## Troubleshooting

### Products not updating?
- Check that backend is running: `npm run dev` in backend folder
- Verify API endpoint: http://localhost:5000/api/products
- Open browser DevTools (F12) → Network tab → Check API calls
- Wait 10 seconds for auto-refresh

### Still not working?
- **Refresh manually** (F5 or Ctrl+R)
- **Check console** for errors (F12 → Console)
- **Verify backend** can fetch products:
  ```
  curl http://localhost:5000/api/products
  ```

### How to verify API is working
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for request to `/api/products`
5. Should show products JSON response

---

## Performance Notes

- Products fetch every 10 seconds
- Smooth experience with 50+ products
- For 100+ products, consider pagination (future enhancement)
- Network requests are lightweight (JSON only, no images)

---

## Next: Testing Complete Flow

1. ✅ Admin dashboard working
2. ✅ Add products as admin
3. ✅ Real-time updates visible to users
4. → **Next: Test checkout flow with dynamic products**

---

## Quick Reference

| Action | User Sees | When |
|--------|-----------|------|
| Admin adds product | Product appears on home/catalog | Instantly or within 10s |
| Admin edits product | Details update (price, description) | Instantly or within 10s |
| Admin deletes product | Product disappears | Instantly or within 10s |
| User switches tabs | All changes reflected | Immediately |
| User refreshes page | All changes shown | Immediately |

Perfect! Your shop now syncs in real-time! 🔄✨
