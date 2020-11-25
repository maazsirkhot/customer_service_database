module.exports = {
  SELECT: {
    FINDCUSTOMERBYEMAIL: 'SELECT id, name, email, password, contact FROM customer WHERE email = ?;',
    FINDEMPLOYEEBYEMAIL: 'SELECT id, name, email, password, contact, joined_on, is_active FROM employee WHERE email = ?;',
    FINDALLDEPARTMENTS: 'SELECT * FROM department;',
    FINDALLPROJECTS: 'SELECT * FROM projects;',
    FIND_COUNT_OF_UNRESOLVED_ISSUES: 'SELECT COUNT(1) FROM issues WHERE resolved_date IS NULL;',
    FIND_LONGEST_PENDING_ISSUE: 'SELECT id FROM issues WHERE resolved_date IS NULL AND created_on = (SELECT MIN(created_on) FROM issues WHERE resolved_date IS NULL);',
  },
  INSERT: {
    CUSTOMER: 'INSERT INTO customer (name, email, password, contact) VALUES (?, ?, ?, ?);',
    EMPLOYEE: 'INSERT INTO employee (name, email, password, contact, joined_on) VALUES (?, ?, ?, ?, ?);',
    DEPARTMENT: 'INSERT INTO department (name, description, manager_id) VALUES (?, ?, ?);',
    PROJECT: 'INSERT INTO projects (name, description, start_date, end_date, dept_id) VALUES (?, ?, ?, ?, ?);',

    ADD_MEMBER_TO_PROJECT: '',
    ASSIGN_ISSUES_TO_PROJECT: '',
    ADD_COMMENT_TO_ISSUE: '',
    ASSIGN_EMPLOYEE_TO_ISSUE: '',
  },
  UPDATE: {
    DEPARTMENT: 'UPDATE department SET name = ?, description = ?, is_active = ? where id = ?;',
    PROJECT: 'UPDATE projects SET name = ?, description = ?, is_ongoing = ? where id = ?;',
    ISSUES: '',
    UPDATE_STATUS_OF_ISSUE: '',
  },
  STORED_PROCEDURES: {

  },
  VIEWS: {
    VIEW_PROJECTS_IN_DEPARTMENT: '',
    VIEW_PROJECTS_FOR_EMPLOYEE: '',
    VIEW_ISSUE_WITH_COMMENTS: '',
    VIEW_EMPLOYEES_IN_PROJECT: '',
    VIEW_RESOLVED_ISSSUES: '',
    VIEW_ONGOING_ISSUES: '',
    VIEW_UNASSIGNED_ISSUES: '',
    VIEW_ISSUES_CREATED_BY_CUSTOMER: '',
    VIEW_ISSUES_FOR_PROJECT: '',
  },
  CHECKS: {
    IS_EMPLOYEE_MANAGER: '',
    IS_EMPLOYEE_ASSOCIATED_WITH_ISSUE: '',
    IS_CUSTOMER_ISSUE_OWNER: '',
    IS_PROJECT_ENDED: '',
  },
};
