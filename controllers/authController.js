// --------------------------------------------------------------------------
// ------------  Lógica para los controladores de autenticación  ------------
// --------------------------------------------------------------------------
const admin = require('firebase-admin');
const auth = admin.auth();

// 1. Register 
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.error('🔴 Email and password are required');
    return res.status(400).json({ success: false, error: 'Email and password are required' });
  }

  try {
    const newUser = await auth.createUser({ email, password });
    console.log(`🟢 User created: ${newUser.uid}`); // uid es el identificador único que Firebase asigna al usuario al crear el objeto
    res.status(201).json({ success: true, uid: newUser.uid });
  } catch (error) {
    console.error(`🔴 Error creating user: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Login 
const login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    console.error('🔴 No token provided');
    return res.status(400).json({ success: false, error: 'No token provided' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log(`🟢 User ${decodedToken.email} successfully authenticated`);

    res.cookie('token', idToken, {
      httpOnly: true,
      secure: false, //! cambiar a 'true' en producción con HTTPS
    });

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(`🔴 Login error: ${error.message}`);
    res.status(401).json({ success: false, error: 'Token verification failed' });
  }
};

// 3. Logout 
const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  logout
};