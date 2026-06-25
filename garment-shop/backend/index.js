const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // <-- Added Order Routes Import

// Load environment configurations from the .env file
dotenv.config();

// Establish connection to MongoDB Atlas database
connectDB();

const app = express();

// Standard middleware stack
app.use(cors()); 
app.use(express.json()); 

// MOUNT ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <-- Mounted Order Routes

// Initial Root Route for deployment confirmation
app.get('/', (req, res) => {
  res.send('Production Server API is successfully online.');
});

// Global Error Handling Middleware (Catches unexpected server faults)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server] Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});