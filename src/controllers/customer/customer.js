/* eslint-disable max-len */
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.createdIssues = async (req, res) => {
  try {
    if (req.user.type === 'employee') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.CUSTOMER_VIEWS.VIEW_ISSUES_CREATED_BY_CUSTOMER, [req.user.id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.resolvedIssues = async (req, res) => {
  try {
    if (req.user.type === 'employee') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.CUSTOMER_VIEWS.VIEW_RESOLVED_ISSUES, [req.user.id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.currentIssues = async (req, res) => {
  try {
    if (req.user.type === 'employee') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.CUSTOMER_VIEWS.VIEW_ONGOING_ISSUES, [req.user.id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
