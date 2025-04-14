const Authenticator = require('../controller/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/login', Authenticator.login);
