const { validationResult } = require('express-validator');

const data = require('../data/data');

//****************************************************************************
//  GET ALL
//****************************************************************************
exports.getAll = (req, res) => {
  res.json({
    "ok"   : true,
    "autos": data
  });
}

//****************************************************************************
//  GET ONE
//****************************************************************************
exports.getOne = (req, res) => {
  let company = req.params.company;
  const auto = data.find(a => a.company === company);

  if (!auto) {
    return res.status(404).json({
      ok     : false,
      message: `La compañia ${company} no existe`
    });
  }

  res.json({
    "ok": true,
    auto
  });
}

//****************************************************************************
//  POST
//****************************************************************************
exports.post = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      "ok"    : false,
      "errors": errors.array()
    });
  }

  let autoId = data.length;

  const auto = {
    id     : autoId,
    company: req.body.company,
    model  : req.body.model,
    year   : req.body.year
  };

  data.push(auto);

  res.status(201).json({
    ok: true,
    auto
  });
}

//****************************************************************************
//  PUT
//****************************************************************************
exports.put = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      "ok"    : false,
      "errors": errors.array()
    });
  }

  const auto = data.find(a => a.id === parseInt(req.params.id));

  if (!auto) {
    return res.status(404).json({
      ok     : false,
      message: `No existe el auto con el ID ${req.params.id}`
    });
  }

  auto.company = req.body.company;
  auto.model   = req.body.model;
  auto.year    = req.body.year;

  res.status(200).json({
    ok: true,
    auto
  });
}

//****************************************************************************
//  DELETE
//****************************************************************************
exports.delete = (req, res) => {
  const auto = data.find(a => a.id === parseInt(req.params.id));

  if (!auto) {
    return res.status(404).json({
      ok     : false,
      message: `No existe el auto con el ID ${req.params.id}`
    });
  }

  const index = data.indexOf(auto);
  data.splice(index, 1);

  res.status(200).json({
    ok: true,
    message: 'Auto eliminado'
  });
}