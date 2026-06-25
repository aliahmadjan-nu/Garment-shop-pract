const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  const errorMessage =
    'JWT_SECRET is not defined. Set JWT_SECRET in your environment variables before starting the backend.';

  if (process.env.NODE_ENV === 'production') {
    throw new Error(errorMessage);
  }

  console.warn(
    `WARNING: ${errorMessage} Falling back to a development-only secret.`
  );
}

const getJwtSecret = () => JWT_SECRET || 'dev_fallback_jwt_secret';

module.exports = getJwtSecret;
