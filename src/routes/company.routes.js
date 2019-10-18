const express = require('express');
const { check } = require('express-validator');

const companyController = require('../controllers/company.controller');

const router = express.Router();
const url = '/api/v1/compania';

//****************************************************************************
//  GET ALL
//****************************************************************************
router.get(url, companyController.getAll);

//****************************************************************************
//  GET ONE
//****************************************************************************
router.get(`${url}/:id`, companyController.getOne);

//****************************************************************************
//  POST
//****************************************************************************
router.post(url, [
  check('name').trim().isLength({ min: 2 })
], companyController.post);

//****************************************************************************
//  PUT
//****************************************************************************
router.put(`${url}/:id`, [
  check('name').trim().isLength({ min: 2 })
], companyController.put);

//****************************************************************************
//  DELETE
//****************************************************************************
router.delete(`${url}/:id`, companyController.delete);

module.exports = router;