const { startSession } = require('mongoose');

const Sale = require('../models/sale.model');
const Car  = require('../models/car.model');
const User = require('../models/user.model');

//****************************************************************************
//  GET ALL
//****************************************************************************
exports.getAll = async (req, res) => {
  try {
    const sales = await Sale.find().populate('user', 'name email').populate('car', 'model');

    if (sales.length === 0) {
      return res.status(400).json({
        ok  : true,
        resp: 'No hay registros en la base de datos'
      });
    }

    res.status(200).json({
      ok  : true,
      data: sales
    });
  } catch (error) {
    return res.status(400).json({
      ok     : false,
      message: 'Error en la base de datos, no se pueden traer los datos',
      error
    });
  }
}

//****************************************************************************
//  POST SALE
//****************************************************************************
exports.post = async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (user === null) {
    return res.status(404).json({
      ok     : false,
      message: `No existe un usuario con el ID ${req.params.id}`
    });
  }

  const car = await Car.findById(req.body.carId);

  if (car === null) {
    return res.status(404).json({
      ok     : false,
      message: `No existe un auto con el ID ${req.params.id}`
    });
  }

  if (car.sold) {
    return res.status(400).json({
      ok     : false,
      message: 'El auto ha sido vendido'
    });
  }

  const sale = new Sale({
    user : user._id,
    car  : car._id,
    price: req.body.price
  });

  const session = await startSession();
  session.startTransaction();

  try {
    const result = await sale.save();

    user.isCustomer = true;
    user.save();

    car.sold = true;
    car.save();

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      ok: true,
      result
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  
    return res.status(500).json({
      ok     : false,
      message: 'Error en la transacción',
      error
    });
  }
}