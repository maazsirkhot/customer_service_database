const express = require('express');
const passport = require('passport');
const projectController = require('../controllers/project/project');
const validator = require('./validator');

const router = express.Router();

router.post('/new', validator.createProject, passport.authenticate('jwt', { session: false }), projectController.createProject);
router.put('/update', validator.updateProject, passport.authenticate('jwt', { session: false }), projectController.updateProject);

module.exports = router;
