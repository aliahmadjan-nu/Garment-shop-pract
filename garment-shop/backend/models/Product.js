const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true // e.g., 'Shirts', 'Pants', 'Traditional'
  },
  sizes: [
    {
      type: String,
      required: true // e.g., ['S', 'M', 'L', 'XL']
    }
  ],
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: false // We'll store image URLs here later
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);