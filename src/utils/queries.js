module.exports = {
  SELECT: {
    FINDCUSTOMERBYEMAIL: 'SELECT CUSTOMERID, NAME, EMAIL, PASSWORD, CONTACT FROM CUSTOMER WHERE EMAIL = ?;',
  },
  INSERT: {
    CUSTOMER: 'INSERT INTO customer (name, email, password, contact) VALUES (?, ?, ?, ?);',
  },
  UPDATE: {

  },
  DELETE: {

  },
  STORED_PROCEDURES: {

  },
  VIEWS: {

  },
};
