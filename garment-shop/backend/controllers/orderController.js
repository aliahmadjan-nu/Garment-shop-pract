const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Create a new order processing checkout
// @route   POST /api/orders
// @access  Private (Logged-in users only)
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No items found in your checkout cart');
  } else {
    // Instantiate a new order document in the database
    const order = new Order({
      user: req.user._id, // Set automatically by our protect middleware!
      orderItems,
      totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

module.exports = { addOrderItems, getMyOrders };