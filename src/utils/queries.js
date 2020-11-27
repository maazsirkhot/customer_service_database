module.exports = {
  SELECT: {
    FINDCUSTOMERBYEMAIL: 'SELECT id, name, email, password, contact FROM customer WHERE email = ?;',
    FINDEMPLOYEEBYEMAIL: 'SELECT id, name, email, password, contact, joined_on, is_active FROM employee WHERE email = ?;',
    FINDALLDEPARTMENTS: 'SELECT * FROM department;',
    FINDALLPROJECTS: 'SELECT * FROM projects;',
    FIND_COUNT_OF_UNRESOLVED_ISSUES: 'SELECT COUNT(1) FROM issues WHERE resolved_date IS NULL;',
    FIND_LONGEST_PENDING_ISSUE: 'SELECT id, description FROM issues WHERE resolved_date IS NULL AND created_on = (SELECT MIN(created_on) FROM issues WHERE resolved_date IS NULL);',
    FIND_EMPLOYEE_WORKING_ON_ISSUE: 'SELECT assignee_id, MAX(assigned_on) as assigned_on FROM issues_assignment WHERE issue_id=?;',
  },
  INSERT: {
    CUSTOMER: 'INSERT INTO customer (name, email, password, contact) VALUES (?, ?, ?, ?);',
    EMPLOYEE: 'INSERT INTO employee (name, email, password, contact, joined_on) VALUES (?, ?, ?, ?, ?);',
    DEPARTMENT: 'INSERT INTO department (name, description, manager_id) VALUES (?, ?, ?);',
    PROJECT: 'INSERT INTO projects (name, description, start_date, end_date, dept_id) VALUES (?, ?, ?, ?, ?);',
    ISSUES: 'INSERT INTO issues (description, project_id) VALUES (?, ?);',
    ADD_MEMBER_TO_PROJECT: 'INSERT INTO employee_projects_mapping (employee_id, project_id, start_date, end_date) VALUES (?, ?, ?, ?);',
    ADD_COMMENT_TO_ISSUE: 'INSERT INTO comments (user_id, issue_id, comment, user_type) VALUES (?, ?, ?, ?);',
    ASSIGN_EMPLOYEE_TO_ISSUE: 'INSERT INTO issues_assignment (employee_id, issue_id, assignee_id) VALUES (?, ?, ?);',
  },
  UPDATE: {
    DEPARTMENT: 'UPDATE department SET name = ?, description = ?, is_active = ? where id = ?;',
    PROJECT: 'UPDATE projects SET name = ?, description = ?, is_ongoing = ? where id = ?;',
    PROJECT_MEMBER: 'UPDATE employee_projects_mapping SET is_active = ? where employee_id = ? and project_id = ?;',
    ISSUES: '',
    CLOSE_ISSUE: 'UPDATE issues SET status = ?, resolved_date = NOW() WHERE issue_id = ?;',
    UPDATE_STATUS_OF_ISSUE: 'UPDATE issues SET status = ? WHERE issue_id = ?;',
    UPDATE_PROJECT_ON_ISSUE: 'UPDATE issues SET project_id = ? WHERE issue_id = ?',
  },
  STORED_PROCEDURES: {

  },
  VIEWS: {
    VIEW_ISSUE_WITH_COMMENTS: 'SELECT * FROM v_issue_with_comments WHERE issue_id = ?;',
    VIEW_EMPLOYEES_IN_PROJECT: '',
    VIEW_UNASSIGNED_ISSUES: '',
    VIEW_ISSUES_FOR_PROJECT: '',
  },
  CUSTOMER_VIEWS: {
    VIEW_ISSUES_CREATED_BY_CUSTOMER: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ?;',
    VIEW_RESOLVED_ISSUES: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ? AND issue_resolved_date IS NOT NULL AND issue_resolved_date <= DATE(NOW());',
    VIEW_ONGOING_ISSUES: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ? AND issue_resolved_date IS NULL;',
  },
  EMPLOYEE_VIEWS: {
    VIEW_PROJECTS_IN_DEPARTMENT: 'select * from v_projects_in_department WHERE dept_name = ? OR dept_id = ?;',
    VIEW_ISSUES_CREATED_BY_CUSTOMER: 'SELECT * FROM v_customer_issues_details WHERE customer_id = ?;',
    VIEW_RESOLVED_ISSUES_BY_PROJECT: 'SELECT * FROM v_customer_issues_details WHERE issue_resolved_date IS NOT NULL AND issue_resolved_date <= DATE(NOW()) AND (project_id = ? OR project_name = ?);',
    VIEW_ONGOING_ISSUES_BY_PROJECT: 'SELECT * FROM v_customer_issues_details WHERE issue_resolved_date IS NULL AND (project_id = ? OR project_name = ?);',
    VIEW_PROJECTS_FOR_EMPLOYEE: '',
  },
  CHECKS: {
    IS_EMPLOYEE_MANAGER: 'SELECT * FROM department WHERE manager_id = ?;',
    IS_EMPLOYEE_ASSOCIATED_WITH_ISSUE: 'SELECT * FROM issues_assignment WHERE employee_id = ? AND issue_id = ? AND assigned_on = (SELECT MAX(assigned_on) FROM issues_assignment WHERE issue_id = ?);',
    IS_CUSTOMER_ISSUE_OWNER: 'SELECT * FROM customer_issues_mapping WHERE customer_id = ? AND issue_id = ?;',
    IS_PROJECT_ENDED: 'SELECT * FROM projects WHERE id = ? AND end_date IS NOT NULL AND end_date <= DATE(NOW());',
  },
};
