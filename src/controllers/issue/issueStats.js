/* eslint-disable max-len */
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.issueStats = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }

    if (req.body.action === 'UNRESOLVED_ISSUES') {
      const result = await pool.promise().query(queries.SELECT.FIND_COUNT_OF_UNRESOLVED_ISSUES, []);
      res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0][0]);
      return;
    }
    if (req.body.action === 'LONGEST_PENDING_ISSUES') {
      const result = await pool.promise().query(queries.SELECT.FIND_LONGEST_PENDING_ISSUE, []);
      res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0][0]);
      return;
    }
    res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_PARAMETERS_PROVIDED);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.employeeOnIssue = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.SELECT.FIND_EMPLOYEE_WORKING_ON_ISSUE, [req.query.issue_id]);
    if (result[0][0].assignee_id === null) {
      res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      return;
    }
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0][0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
