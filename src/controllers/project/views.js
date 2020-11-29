/* eslint-disable max-len */
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.viewProjectsInDepartment = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_PROJECTS_IN_DEPARTMENT, [req.query.dept_name, req.query.dept_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.viewIssuesByCustomer = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_ISSUES_CREATED_BY_CUSTOMER, [req.query.customer_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.viewResolvedIssuesByProject = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_RESOLVED_ISSUES_BY_PROJECT, [req.query.project_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.viewOngoingIssuesByProject = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_ONGOING_ISSUES_BY_PROJECT, [req.query.project_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.viewProjectsOfEmployee = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_PROJECTS_OF_EMPLOYEE, [req.query.employee_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.viewUnAssignedIssues = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.EMPLOYEE_VIEWS.VIEW_UNASSIGNED_ISSUES, []);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
