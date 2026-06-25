const express = require('express');
const router = express.Router();

// Import the controllers we just wrote
const { registerUser, authUser } = require('../controllers/userController');

// Route 1: Registration
// When a POST request hits '/', it triggers registerUser
router.post('/', registerUser);

// Route 2: Login
// When a POST request hits '/login', it triggers authUser
router.post('/login', authUser);

module.exports = router;