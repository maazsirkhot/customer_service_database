/* eslint-disable max-len */
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.createDepartment = async (req, res) => {
  try {
    // req.user contains passport user
    const result = await pool.promise().query(queries.INSERT.DEPARTMENT, [req.body.name, req.body.description, req.user.id]);
    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({ departmentId: result[0].insertId });
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    let query = queries.UPDATE.DEPARTMENT;
    const params = [];
    if (!req.body.name && !req.body.description && !req.body.is_active) {
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
    if (!req.body.is_active) {
      query = query.replace('is_active = ? ', '');
    } else {
      params.push(req.body.is_active);
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
