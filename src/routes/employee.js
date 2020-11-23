const express = require('express');
const employeeAuthorizationController = require('../controllers/employee/authorization');
const validator = require('./validator');

const router = express.Router();

router.post('/signup', employeeAuthorizationController.signup);
router.get('/login', validator.login, employeeAuthorizationController.login);

module.exports = router;
