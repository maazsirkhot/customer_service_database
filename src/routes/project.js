const express = require('express');
const passport = require('passport');
const projectController = require('../controllers/project/project');
const viewController = require('../controllers/project/views');
const validator = require('./validator');

const router = express.Router();

router.post('/new', validator.createProject, passport.authenticate('jwt', { session: false }), projectController.createProject);
router.put('/update', validator.updateProject, passport.authenticate('jwt', { session: false }), projectController.updateProject);

router.post('/addmember', validator.addMember, passport.authenticate('jwt', { session: false }), projectController.addMember);
router.put('/updatemember', validator.updateMemberStatus, passport.authenticate('jwt', { session: false }), projectController.updateMemberStatus);

// Views
router.get('/view/department', validator.viewProjectsInDepartment, passport.authenticate('jwt', { session: false }), viewController.viewProjectsInDepartment);
router.get('/view/issuesbycustomer', validator.viewIssuesByCustomer, passport.authenticate('jwt', { session: false }), viewController.viewIssuesByCustomer);
router.get('/view/resolvedissues', validator.viewIssuesByProject, passport.authenticate('jwt', { session: false }), viewController.viewResolvedIssuesByProject);
router.get('/view/ongoingissues', validator.viewIssuesByProject, passport.authenticate('jwt', { session: false }), viewController.viewOngoingIssuesByProject);
router.get('/view/byemployee', validator.viewProjectsOfEmployee, passport.authenticate('jwt', { session: false }), viewController.viewProjectsOfEmployee);
router.get('/view/unassignedissues', passport.authenticate('jwt', { session: false }), viewController.viewUnAssignedIssues);

module.exports = router;
