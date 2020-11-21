const express = require('express');
const customerAuthorizationController = require('../controllers/customer/authorization');

const router = express.Router();

router.post('/signup', customerAuthorizationController.signup);

module.exports = router;
