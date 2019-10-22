const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../../models/user.model');

//****************************************************************************
//  LOGIN
//****************************************************************************
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      "ok"    : false,
      "errors": errors.array()
    });
  }

  let user = await User.findOne({
    email: req.body.email
  });

  if (user === null) {
    return res.status(400).json({
      ok     : false,
      message: 'E-mail o Password incorrectos'
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      ok     : false,
      message: 'E-mail o Password incorrectos'
    });
  }

  const token = user.generateJWT();

  res.status(200).header('Authorization', token).json({
    ok : true,
    user : {
      _id  : user._id,
      name : user.name,
      email: user.email
    }
  });
}