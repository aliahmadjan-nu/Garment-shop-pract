# Admin Setup Guide

## How to Create an Admin User

### Option 1: Using a Setup Script (Recommended)

1. **Create a setup script in your backend:**

Create a file `backend/scripts/createAdmin.js`:

```javascript
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Admin details
    const adminData = {
      name: 'Admin User',
      email: 'admin@garmentshop.com',
      password: 'AdminPassword123',
      isAdmin: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists with this email');
      process.exit(1);
    }

    // Create new admin user
    const admin = await User.create(adminData);
    console.log('✓ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: AdminPassword123 (change this after first login!)');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
```

2. **Run the script:**
```bash
cd backend
node scripts/createAdmin.js
```

### Option 2: Manual Database Update

1. Connect to MongoDB using MongoDB Compass or mongo shell
2. Find the users collection in your database
3. Create a new document with:
   - `name`: Your admin name
   - `email`: admin@garmentshop.com
   - `password`: (Hashed password - use bcrypt to hash it)
   - `isAdmin`: true

⚠️ **Important:** The password must be hashed using bcrypt before storing!

### Option 3: Using MongoDB CLI

```bash
# Connect to your MongoDB
mongo

# Switch to your database
use garment_shop

# Insert admin user (with hashed password from bcrypt)
db.users.insertOne({
  name: "Admin User",
  email: "admin@garmentshop.com",
  password: "$2a$10$hashedPasswordHere",  // Use bcrypt hashed password
  isAdmin: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Login with Admin Account

1. Go to the website: `http://localhost:5173` (or your frontend URL)
2. Click on the **Login** link
3. Enter admin credentials:
   - **Email:** admin@garmentshop.com
   - **Password:** AdminPassword123
4. Click **Login**

---

## Access Admin Dashboard

After logging in as admin, you'll see:
- **Admin** link appears in the navigation bar (with settings icon)
- Click it to access the **Admin Dashboard**

---

## Admin Dashboard Features

### View All Products
- See a table of all products in your store
- View: Name, Price, Category, Stock, Images

### Add New Product
- Click **+ Add New Product** button
- Fill in:
  - Product Name
  - Category
  - Price (in Rs)
  - Stock quantity
  - Image URL (from Unsplash or your own CDN)
  - Description
  - Available sizes (S, M, L, XL, XXL)
- Click **Add Product** to save

### Edit Product
- Click the **Edit** (pencil icon) button next to any product
- Modify any field
- Click **Update Product** to save changes

### Delete Product
- Click the **Delete** (trash icon) button next to any product
- Confirm the deletion
- Product will be removed immediately

---

## API Endpoints for Admins

All these endpoints require:
- **Authorization header:** `Bearer YOUR_JWT_TOKEN`
- **isAdmin:** true (in user profile)

### Create Product
```
POST /api/products
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Premium Cotton T-Shirt",
  "description": "Soft, breathable...",
  "price": 24.99,
  "category": "Shirts",
  "sizes": ["S", "M", "L", "XL"],
  "stock": 100,
  "imageUrl": "https://images.unsplash.com/..."
}
```

### Update Product
```
PUT /api/products/{productId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Updated Name",
  "price": 29.99,
  "stock": 50,
  // ... other fields
}
```

### Delete Product
```
DELETE /api/products/{productId}
Authorization: Bearer {token}
```

---

## Security Notes ⚠️

1. **Change Default Password:** After creating the admin account, login and change the password
2. **Keep Token Secure:** Admin tokens grant full access - don't share them
3. **Backup Database:** Always backup your database before making bulk changes
4. **Audit Trail:** Consider adding logs for admin actions in production

---

## Troubleshooting

### "Not authorized. Administrative privileges required"
- Make sure you're logged in
- Check that `isAdmin` is set to `true` for your user in the database
- Verify your JWT token is valid

### "Admin link not showing"
- Make sure you're logged in as an admin user
- Refresh the page
- Check browser console for errors

### Product not saving
- Check that all required fields are filled
- Verify the image URL is accessible
- Check browser console for validation errors
- Check backend logs for detailed error messages

### Can't connect to backend
- Make sure backend is running: `npm run dev` in the backend folder
- Default URL: `http://localhost:5000`
- If using different port, update the fetch URLs in the admin components
- Check that `MONGO_URI` is set correctly in backend/.env file

---

## Quick Start Checklist

- [ ] Backend running (`npm run dev` from backend folder)
- [ ] Frontend running (`npm run dev` from frontend folder)
- [ ] Admin user created with script or manual method
- [ ] Logged in as admin user
- [ ] Admin link visible in navbar
- [ ] Can access `/admin` dashboard
- [ ] Can add, edit, delete products

---

## Next Steps

After setting up admin:
1. Add your first products
2. Test the full flow: Add → View on Home → Add to Cart → Checkout
3. Set up payment integration (future feature)
4. Configure product images from your own CDN if needed
