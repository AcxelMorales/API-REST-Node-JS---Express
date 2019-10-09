const { validationResult } = require('express-validator');

const Car = require('../models/car.model');

//****************************************************************************
//  GET ALL
//****************************************************************************
exports.getAll = async (req, res) => {
  try {
    const resp = await Car.find();

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
    const car = await Car.findById(req.params.id);

    if (car === null) {
      return res.status(404).json({
        ok: false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }
    
    res.status(200).json({
      ok: true,
      car
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
    const car = new Car({
      company: req.body.company,
      model  : req.body.model,
      year   : req.body.year,
      sold   : req.body.sold,
      price  : req.body.price,
      extras : req.body.extras
    });

    const result = await car.save();

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
    const car = await Car.findByIdAndUpdate(req.params.id, {
      company: req.body.company,
      model  : req.body.model,
      year   : req.body.year,
      sold   : req.body.sold,
      price  : req.body.price,
      extras : req.body.extras
    }, {
      new: true
    });

    if (car === null) {
      return res.status(404).json({
        ok: false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      update: car
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
    const car = await Car.findByIdAndDelete(req.params.id);

    if (car === null) {
      return res.status(404).json({
        ok     : false,
        message: `No existe un elemento con el ID ${req.params.id}`
      });
    }

    res.status(200).json({
      ok    : true,
      delete: car
    });
  } catch (error) {
    return res.status(404).json({
      ok     : false,
      message: `Error al eliminar`,
      error
    });
  }
}
