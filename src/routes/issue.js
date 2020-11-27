const express = require('express');
const passport = require('passport');
const issueController = require('../controllers/issue/issue');
const validator = require('./validator');

const router = express.Router();

router.post('/assign', validator.createIssue, passport.authenticate('jwt', { session: false }), issueController.createIssue);
router.put('/update', validator.updateIssue, passport.authenticate('jwt', { session: false }), issueController.updateIssue);

router.post('/assignemployee', validator.assignEmployee, passport.authenticate('jwt', { session: false }), issueController.assignEmployee);
router.post('/comment', validator.addComments, passport.authenticate('jwt', { session: false }), issueController.addComments);

module.exports = router;
