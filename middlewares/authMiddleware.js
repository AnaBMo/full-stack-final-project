// -------------------------------------------------------------
// -------  Middleware para verificar la autenticación  --------
// -------------------------------------------------------------
const admin = require('../config/firebase');
const auth = admin.auth();

const authMiddleware = async (req, res, next) => {
  let idToken;

  // 1. Intenta obtener el token de las cookies
  if (req.cookies && req.cookies.token) {
    idToken = req.cookies.token;
  }

  // 2. Si no hay cookie, intenta desde el Authorization Header
  if (!idToken && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split(' ')[1];
  }

  if (!idToken) {
    console.error('🔴 No token provided');
    return res.status(401).json({ error: 'Unauthorized: No token found' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('🔴 Error verifying token:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = authMiddleware;