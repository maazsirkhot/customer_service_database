/* eslint-disable max-len */
const moment = require('moment');
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.createProject = async (req, res) => {
  try {
    if (!req.user.joined_on) {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const startDate = moment(req.body.start_date).format('YYYY-MM-DD');
    const endDate = moment(req.body.end_date).format('YYYY-MM-DD');
    const result = await pool.promise().query(queries.INSERT.PROJECT, [req.body.name, req.body.description, startDate, endDate, req.body.dept_id]);
    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({ projectId: result[0].insertId });
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.updateProject = async (req, res) => {
  try {
    let query = queries.UPDATE.DEPARTMENT;
    const params = [];
    if (!req.body.name && !req.body.description && !req.body.is_ongoing) {
      res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_PARAMETERS_PROVIDED);
      res.end();
      return;
    }
    if (!req.body.name) {
      query = query.replace('name = ?, ', '');
    } else {
      params.push(req.body.name);
    }
    if (!req.body.description) {
      query = query.replace('description = ?, ', '');
    } else {
      params.push(req.body.description);
    }
    if (!req.body.is_ongoing) {
      query = query.replace('is_ongoing = ? ', '');
    } else {
      params.push(req.body.is_ongoing);
    }
    params.push(req.body.id);
    const result = await pool.promise().query(query, params);
    if (result[0].affectedRows < 1) {
      res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
