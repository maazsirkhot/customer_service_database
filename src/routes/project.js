const express = require('express');
const passport = require('passport');
const projectController = require('../controllers/project/project');
const validator = require('./validator');

const router = express.Router();

router.post('/new', validator.createProject, passport.authenticate('jwt', { session: false }), projectController.createProject);
router.put('/update', validator.updateProject, passport.authenticate('jwt', { session: false }), projectController.updateProject);

router.post('/addmember', validator.addMember, passport.authenticate('jwt', { session: false }), projectController.addMember);
router.put('/updatemember', validator.updateMemberStatus, passport.authenticate('jwt', { session: false }), projectController.updateMemberStatus);

module.exports = router;
