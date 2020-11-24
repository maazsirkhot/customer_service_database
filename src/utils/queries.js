module.exports = {
  SELECT: {
    FINDCUSTOMERBYEMAIL: 'SELECT id, name, email, password, contact FROM customer WHERE email = ?;',
    FINDEMPLOYEEBYEMAIL: 'SELECT id, name, email, password, contact, joined_on, is_active FROM employee WHERE email = ?;',
  },
  INSERT: {
    CUSTOMER: 'INSERT INTO customer (name, email, password, contact) VALUES (?, ?, ?, ?);',
    EMPLOYEE: 'INSERT INTO employee (name, email, password, contact, joined_on) VALUES (?, ?, ?, ?, ?);',
    DEPARTMENT: 'INSERT INTO department (name, description, manager_id) VALUES (?, ?, ?);',
    PROJECT: 'INSERT INTO projects (name, description, start_date, end_date, dept_id) VALUES (?, ?, ?, ?, ?);',
  },
  UPDATE: {
    DEPARTMENT: 'UPDATE department SET name = ?, description = ?, is_active = ? where id = ?',
    PROJECT: 'UPDATE projects SET name = ?, description = ?, is_ongoing = ? where id = ?',
  },
  DELETE: {

  },
  STORED_PROCEDURES: {

  },
  VIEWS: {

  },
};
