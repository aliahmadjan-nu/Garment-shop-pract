const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Signs the user identity ID with our secret key and sets an expiration limit of 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;