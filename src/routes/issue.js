const express = require('express');
const passport = require('passport');
const issueController = require('../controllers/issue/issue');
const statController = require('../controllers/issue/issueStats');
const validator = require('./validator');

const router = express.Router();

router.post('/new', validator.createIssue, passport.authenticate('jwt', { session: false }), issueController.createIssue);
router.put('/update', validator.updateIssue, passport.authenticate('jwt', { session: false }), issueController.updateIssue);

router.post('/assignemployee', validator.assignEmployee, passport.authenticate('jwt', { session: false }), issueController.assignEmployee);
router.post('/comment', validator.addComments, passport.authenticate('jwt', { session: false }), issueController.addComments);

// Views
router.get('/comments/:issue_id', validator.fetchIssues, passport.authenticate('jwt', { session: false }), issueController.fetchIssue);
router.get('/project/:issue_id', validator.fetchIssues, passport.authenticate('jwt', { session: false }), issueController.fetchIssuesForProject);

// Stats
router.get('/stats', validator.stats, passport.authenticate('jwt', { session: false }), statController.issueStats);
router.get('/employeeissue', validator.employeeOnIssue, passport.authenticate('jwt', { session: false }), statController.employeeOnIssue);
module.exports = router;
