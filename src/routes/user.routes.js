const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user.controller');

const router = express.Router();
const url = '/api/v1/usuarios';

//****************************************************************************
//  GET ALL
//****************************************************************************
router.get(url, userController.getAll);

//****************************************************************************
//  GET ONE
//****************************************************************************
router.get(`${url}/:id`, userController.getOne);

//****************************************************************************
//  POST
//****************************************************************************
router.post(url, [
  check('name').trim().isLength({ min: 3 }),
  check('email').trim().isEmail(),
  check('password').trim().isLength({ min: 6 })
], userController.post);

//****************************************************************************
//  PUT
//****************************************************************************
router.put(`${url}/:id`, [
  check('name').trim().isLength({ min: 3 }),
  check('email').trim().isEmail(),
], userController.put);

//****************************************************************************
//  DELETE
//****************************************************************************
router.delete(`${url}/:id`, userController.delete);

module.exports = router;