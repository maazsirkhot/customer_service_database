/* eslint-disable max-len */
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.createIssue = async (req, res) => {
  try {
    if (req.user.type === 'employee') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }
    const result = await pool.promise().query(queries.STORED_PROCEDURES.CREATE_NEW_ISSUE, [req.user.id, req.body.description, req.body.project_id]);
    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const { action } = req.body;

    if (action === 'CLOSE_STATUS') {
      if (req.user.type === 'customer' || !req.body.status) {
        res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.OPERATION_UNSUCCESSFUL);
        res.end();
        return;
      }
      const result = await pool.promise().query(queries.UPDATE.CLOSE_ISSUE, [req.body.status, req.body.issue_id]);
      if (result[0].affectedRows < 1) {
        res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
        res.end();
        return;
      }
      res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
      return;
    }
    if (action === 'UPDATE_STATUS') {
      if (req.user.type === 'customer' || !req.body.status) {
        res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.OPERATION_UNSUCCESSFUL);
        res.end();
        return;
      }
      const result = await pool.promise().query(queries.UPDATE.UPDATE_STATUS_OF_ISSUE, [req.body.status, req.body.issue_id]);
      if (result[0].affectedRows < 1) {
        res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
        res.end();
        return;
      }
      res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
      return;
    }
    if (action === 'UPDATE_PROJECT') {
      if (req.user.type === 'customer' || !req.body.project_id) {
        res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.OPERATION_UNSUCCESSFUL);
        res.end();
        return;
      }
      const result = await pool.promise().query(queries.UPDATE.UPDATE_PROJECT_ON_ISSUE, [req.body.project_id, req.body.issue_id]);
      if (result[0].affectedRows < 1) {
        res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_RECORD_FOUND);
        res.end();
        return;
      }
      res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
      return;
    }
    res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.NO_PARAMETERS_PROVIDED);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.assignEmployee = async (req, res) => {
  try {
    if (req.user.type === 'customer') {
      res.status(constants.STATUS_CODE.FORBIDDEN_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      res.end();
      return;
    }

    const result = await pool.promise().query(queries.INSERT.ASSIGN_EMPLOYEE_TO_ISSUE, [req.user.id, req.body.issue_id, req.body.assignee_id]);
    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.addComments = async (req, res) => {
  try {
    const result = await pool.promise().query(queries.STORED_PROCEDURES.ADD_COMMENT_TO_ISSUE, [req.user.id, req.body.issue_id, req.body.comment, req.user.type]);
    const procedureStatus = result[0][1][0]['@is_inserted'];
    if (procedureStatus === 'F') {
      res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send(constants.MESSAGES.OPERATION_UNSUCCESSFUL);
      return;
    }
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({ data: result[0][0] });
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.fetchIssue = async (req, res) => {
  try {
    const result = await pool.promise().query(queries.VIEWS.VIEW_ISSUE_WITH_COMMENTS, [req.params.issue_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.fetchIssuesForProject = async (req, res) => {
  try {
    const result = await pool.promise().query(queries.VIEWS.VIEW_ISSUES_FOR_PROJECT, [req.params.project_id]);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result[0]);
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
