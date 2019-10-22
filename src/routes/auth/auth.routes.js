const express = require('express');
const { check } = require('express-validator');

const authController = require('../../controllers/auth/auth.controller');

const router = express.Router();
const url = '/api/v1/login';

//****************************************************************************
//  LOGIN
//****************************************************************************
router.post(url, [
  check('email').trim().isEmail(),
  check('password').trim().isLength({ min: 6 })
], authController.login);

module.exports = router;