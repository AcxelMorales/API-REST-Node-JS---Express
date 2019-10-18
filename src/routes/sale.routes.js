const express = require('express');

const saleController = require('../controllers/sale.controller');

const router = express.Router();
const url = '/api/v1/venta';

//****************************************************************************
//  GET SALES
//****************************************************************************
router.get(url, saleController.getAll);

//****************************************************************************
//  POST SALE
//****************************************************************************
router.post(url, saleController.post);

module.exports = router;