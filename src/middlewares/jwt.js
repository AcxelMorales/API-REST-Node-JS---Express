const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      ok     : false,
      message: 'Acceso denegado. Nesecitas un JWT'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY_JWT_CAR_API || 'private-seed');
    req.user = payload;

    next();
  } catch (error) {
    return res.status(400).json({
      ok     : false,
      message: 'Acceso denegado. JWT invalido'
    });
  }
}

module.exports = auth;