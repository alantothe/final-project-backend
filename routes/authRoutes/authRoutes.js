const express = require('express');

const router = express.Router()
const authControllers = require("/Users/alanmalpartida/Desktop/Final_Project/final-project-backend/controllers/auth/authControllers.js");
const Joi = require('joi');
const { Schema } = require('mongoose');
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(12).required(),

});


router.post("/register", validator.body(registerSchema), authControllers.controllers.postRegister);
router.post("/login", validator.body(loginSchema), authControllers.controllers.postLogin);

module.exports = router;