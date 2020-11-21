const constants = require('../../utils/constants');
const queries = require('../../utils/queries');
const pool = require('../../utils/dbConnection');

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const result = await pool.promise().query(queries.INSERT.CUSTOMER,
      [req.body.name, req.body.email, req.body.password, req.body.contact]);

    console.log(result);
    res.status(constants.STATUS_CODE.SUCCESS_STATUS).send();
  } catch (error) {
    res.status(500).send();
  }
};
