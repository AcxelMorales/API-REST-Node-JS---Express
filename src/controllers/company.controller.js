const { validationResult } = require('express-validator');

const Company = require('../models/company.model');

//****************************************************************************
//  GET ALL
//****************************************************************************
exports.getAll = async (req, res) => {
  try {
    const resp = await Company.find();

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
    const company = await Company.findById(req.params.id);

    if (company === null) {
      return res.status(404).json({
        ok: false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }
    
    res.status(200).json({
      ok: true,
      company
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
    const company = new Company({
      name   : req.body.name,
      country: req.body.country
    });

    const result = await company.save();

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
    const company = await Company.findByIdAndUpdate(req.params.id, {
      name   : req.body.name,
      country: req.body.country
    }, {
      new: true
    });

    if (company === null) {
      return res.status(404).json({
        ok     : false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      update: company
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
    const company = await Company.findByIdAndDelete(req.params.id);

    if (company === null) {
      return res.status(404).json({
        ok     : false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      delete: company
    });
  } catch (error) {
    return res.status(404).json({
      ok     : false,
      message: `Error al eliminar`,
      error
    });
  }
}
