const express = require('express');
const { check } = require('express-validator');

const autoController = require('../controllers/auto.controller');

const router = express.Router();
const url = '/api/v1/autos';

//****************************************************************************
//  GET ALL
//****************************************************************************
router.get(url, autoController.getAll);

//****************************************************************************
//  GET ONE
//****************************************************************************
router.get(`${url}/:id`, autoController.getOne);

//****************************************************************************
//  POST
//****************************************************************************
router.post(url, [
  check('company').trim().isLength({ min: 2 }),
  check('model').trim().isLength({ min: 1 }),
  check('year').isLength({ max: 4 })
], autoController.post);

//****************************************************************************
//  PUT
//****************************************************************************
router.put(`${url}/:id`, [
  check('company').trim().isLength({ min: 2 }),
  check('model').trim().isLength({ min: 1 }),
  check('year').isLength({ max: 4 })
], autoController.put);

//****************************************************************************
//  DELETE
//****************************************************************************
router.delete(`${url}/:id`, autoController.delete);

module.exports = router;