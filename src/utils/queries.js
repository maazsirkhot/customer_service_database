module.exports = {
  SELECT: {
    FINDCUSTOMERBYEMAIL: 'SELECT id, name, email, password, contact FROM customer WHERE email = ?;',
    FINDEMPLOYEEBYEMAIL: 'SELECT id, name, email, password, contact, joined_on, is_active FROM employee WHERE email = ?;',
    FINDALLDEPARTMENTS: 'SELECT * FROM department;',
    FINDALLPROJECTS: 'SELECT * FROM projects;',
    FIND_COUNT_OF_UNRESOLVED_ISSUES: 'SELECT COUNT(1) FROM issues WHERE resolved_date IS NULL;',
    FIND_LONGEST_PENDING_ISSUE: 'SELECT id FROM issues WHERE resolved_date IS NULL AND created_on = (SELECT MIN(created_on) FROM issues WHERE resolved_date IS NULL);',
    FIND_EMPLOYEE_WORKING_ON_ISSUE: 'SELECT assignee_id, MAX(assigned_on) as assigned_on FROM issues_assignment WHERE issue_id=?;',
  },
  INSERT: {
    CUSTOMER: 'INSERT INTO customer (name, email, password, contact) VALUES (?, ?, ?, ?);',
    EMPLOYEE: 'INSERT INTO employee (name, email, password, contact, joined_on) VALUES (?, ?, ?, ?, ?);',
    DEPARTMENT: 'INSERT INTO department (name, description, manager_id) VALUES (?, ?, ?);',
    PROJECT: 'INSERT INTO projects (name, description, start_date, end_date, dept_id) VALUES (?, ?, ?, ?, ?);',
    ISSUES: '',
    ADD_MEMBER_TO_PROJECT: '',
    ASSIGN_ISSUES_TO_PROJECT: '',
    ADD_COMMENT_TO_ISSUE: 'INSERT INTO comments (user_id, issue_id, comment, user_type) VALUES (?, ?, ?, ?);',
    ASSIGN_EMPLOYEE_TO_ISSUE: 'INSERT INTO issues_assignment (employee_id, issue_id, assignee_id) VALUES (?, ?, ?);',
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
    IS_EMPLOYEE_MANAGER: 'SELECT * FROM department WHERE manager_id = ?;',
    IS_EMPLOYEE_ASSOCIATED_WITH_ISSUE: 'SELECT * FROM issues_assignment WHERE employee_id = ? AND issue_id = ? AND assigned_on = (SELECT MAX(assigned_on) FROM issues_assignment WHERE issue_id = ?);',
    IS_CUSTOMER_ISSUE_OWNER: '',
    IS_PROJECT_ENDED: 'SELECT * FROM projects WHERE id = ? AND end_date IS NOT NULL AND end_date <= DATE(NOW());',
  },
};
