const jwt = require('jsonwebtoken');
const getJwtSecret = require('./jwtConfig');

const generateToken = (id) => {
  const JWT_SECRET = getJwtSecret();

  // Signs the user identity ID with our secret key and sets an expiration limit of 30 days
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;