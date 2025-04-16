// -------------------------------------------------------------
// -------  Middleware para verificar la autenticación  --------
// -------------------------------------------------------------
const admin = require('../config/firebase');
const auth = admin.auth();

const authMiddleware = async (req, res, next) => {
  const idToken = req.cookies.token;

  if (!idToken) {
    console.error('🔴 No token found in cookie');
    return res.status(401).json({ error: 'Unauthorized: token not found' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // El usuario queda accesible desde los controladores
    next();
  } catch (error) {
    console.error('🔴 Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;