const express = require('express');
const passport = require('passport');
const customerAuthorizationController = require('../controllers/customer/authorization');
const customerController = require('../controllers/customer/customer');
const validator = require('./validator');

const router = express.Router();

router.post('/signup', customerAuthorizationController.signup);
router.get('/login', validator.login, customerAuthorizationController.login);

// Views
router.get('/view/createdissues', passport.authenticate('jwt', { session: false }), customerController.createdIssues);
router.get('/view/resolvedissues', passport.authenticate('jwt', { session: false }), customerController.resolvedIssues);
router.get('/view/currentissues', passport.authenticate('jwt', { session: false }), customerController.currentIssues);

module.exports = router;
