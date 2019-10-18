const { validationResult } = require('express-validator');

const User = require('../models/user.model');

//****************************************************************************
//  GET ALL
//****************************************************************************
exports.getAll = async (req, res) => {
  try {
    const resp = await User.find();

    if (resp.length === 0) {
      return res.status(200).json({
        ok  : true,
        resp: 'No hay registros en la base de datos'
      });
    }

    res.status(200).json({
      ok  : true,
      data: resp
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: 'Error en la base de datos, no se pueden traer los datos',
      error
    });
  }
}

//****************************************************************************
//  GET ONE
//****************************************************************************
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user === null) {
      return res.status(404).json({
        ok     : false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }
    
    res.status(200).json({
      ok: true,
      user
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: `Error al buscar el elemento`,
      error
    });
  }
}

//****************************************************************************
//  POST
//****************************************************************************
exports.post = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      "ok"    : false,
      "errors": errors.array()
    });
  }

  try {
    const user = new User({
      name      : req.body.name,
      email     : req.body.email,
      isCustomer: req.body.isCustomer
    });

    const result = await user.save();

    res.status(201).json({
      ok  : true,
      car : result
    });
  } catch (error) {
    return res.status(400).json({
      ok     : false,
      message: 'Error al crear el elemento',
      error
    });
  }
}

//****************************************************************************
//  PUT
//****************************************************************************
exports.put = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      "ok"    : false,
      "errors": errors.array()
    });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name      : req.body.name,
      email     : req.body.email,
      isCustomer: req.body.isCustomer
    }, {
      new: true
    });

    if (user === null) {
      return res.status(404).json({
        ok: false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      update: user
    });

  } catch (error) {
    return res.status(404).json({
      ok     : false,
      message: 'Error al actualizar',
      error
    });
  }
}

//****************************************************************************
//  DELETE
//****************************************************************************
exports.delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user === null) {
      return res.status(404).json({
        ok     : false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      delete: user
    });
  } catch (error) {
    return res.status(404).json({
      ok     : false,
      message: `Error al eliminar`,
      error
    });
  }
}
