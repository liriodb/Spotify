'use strict'

let express = require('express');
let UserController = require('../controllers/user');

let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.get('/probando', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);



module.exports = api;