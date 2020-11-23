const express = require('express');
const customerAuthorizationController = require('../controllers/customer/authorization');
const validator = require('./validator');

const router = express.Router();

router.post('/signup', customerAuthorizationController.signup);
router.get('/login', validator.login, customerAuthorizationController.login);

module.exports = router;
