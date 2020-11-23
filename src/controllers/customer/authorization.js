/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');
const encrypt = require('../../utils/passwordEncryption');

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await encrypt.createHash(req.body.password);
    const result = await pool.promise().query(queries.INSERT.CUSTOMER, [req.body.name, req.body.email, hashedPassword, req.body.contact]);
    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({ customerId: result[0].insertId });
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const result = await pool.promise().query(queries.SELECT.FINDCUSTOMERBYEMAIL, [req.body.email]);

    if (result.length > 0) {
      const check = await encrypt.compareHash(req.body.password, result[0][0].password);
      console.log(check);
      if (check) {
        const token = jwt.sign({ email: result[0][0].email, type: 'customer' }, 'customerservice', { expiresIn: 7200 });
        res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({ data: result[0][0], token });
      } else {
        res.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
      }
    } else {
      res.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS).send(constants.MESSAGES.AUTHORIZATION_FAILED);
    }
  } catch (error) {
    res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error);
  }
};
