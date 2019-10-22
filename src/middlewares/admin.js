module.exports = function(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      ok     : false,
      message: 'Acceso denegado'
    });
  }

  next();
}