const express = require('express');
const passport = require('passport');
const employeeAuthorizationController = require('../controllers/employee/authorization');
const departmentController = require('../controllers/department/department');
const validator = require('./validator');

const router = express.Router();

router.post('/signup', employeeAuthorizationController.signup);
router.get('/login', validator.login, employeeAuthorizationController.login);

router.post('/department', validator.createDepartment, passport.authenticate('jwt', { session: false }), departmentController.createDepartment);
router.put('/department', validator.updateDepartment, passport.authenticate('jwt', { session: false }), departmentController.updateDepartment);

module.exports = router;
