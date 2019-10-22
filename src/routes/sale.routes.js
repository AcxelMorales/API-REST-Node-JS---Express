const express = require('express');

const saleController = require('../controllers/sale.controller');
const auth           = require('../middlewares/jwt');
const admin          = require('../middlewares/admin');

const router = express.Router();
const url    = '/api/v1/venta';

//****************************************************************************
//  GET SALES
//****************************************************************************
router.get(url, [auth, admin], saleController.getAll);

//****************************************************************************
//  POST SALE
//****************************************************************************
router.post(url, auth, saleController.post);

module.exports = router;