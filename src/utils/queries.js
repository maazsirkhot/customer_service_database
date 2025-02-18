/* eslint-disable max-len */
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
    ISSUES: 'INSERT INTO issues (description, more_information, project_id) VALUES (?, ?, ?);',
    ADD_MEMBER_TO_PROJECT: 'INSERT INTO employee_projects_mapping (employee_id, project_id, start_date, end_date) VALUES (?, ?, ?, ?);',
    ASSIGN_EMPLOYEE_TO_ISSUE: 'INSERT INTO issues_assignment (employee_id, issue_id, assignee_id) VALUES (?, ?, ?);',
  },
  UPDATE: {
    DEPARTMENT: 'UPDATE department SET name = ?, description = ?, is_active = ? where id = ?;',
    PROJECT: 'UPDATE projects SET name = ?, description = ?, is_ongoing = ? where id = ?;',
    // PROJECT_MEMBER: 'UPDATE employee_projects_mapping SET is_active = ? where employee_id = ? and project_id = ?;',
    PROJECT_MEMBER: 'UPDATE employee_projects_mapping SET start_date = ?, end_date = ? where employee_id = ? and project_id = ?;',
    CLOSE_ISSUE: 'UPDATE issues SET status = ?, resolved_date = DATE(NOW()) WHERE id = ? AND resolved_date IS NULL;',
    UPDATE_STATUS_OF_ISSUE: 'UPDATE issues SET status = ? WHERE id = ? AND resolved_date IS NULL;',
    UPDATE_PROJECT_ON_ISSUE: 'UPDATE issues SET project_id = ? WHERE id = ? AND resolved_date IS NULL;',
  },
  STORED_PROCEDURES: {
    CREATE_NEW_ISSUE: 'CALL CREATE_NEW_ISSUE(?, ?, ?);',
    ADD_COMMENT_TO_ISSUE: 'CALL ADD_COMMENT(?, ?, ?, ?, @is_inserted); SELECT @is_inserted;',
  },
  VIEWS: {
    VIEW_ISSUE_WITH_COMMENTS: 'SELECT * FROM v_issue_with_comments WHERE issue_id = ?;',
    // Added
    VIEW_EMPLOYEES_IN_PROJECT: 'SELECT * FROM v_employee_projects_mapping where project_id = ? and is_active = ?;',
    VIEW_ISSUES_FOR_PROJECT: 'SELECT * FROM v_employee_issues_details WHERE project_id = ?;',
  },
  CUSTOMER_VIEWS: {
    VIEW_ISSUES_CREATED_BY_CUSTOMER: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ?;',
    VIEW_RESOLVED_ISSUES: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ? AND issue_resolved_date IS NOT NULL AND issue_resolved_date <= DATE(NOW());',
    VIEW_ONGOING_ISSUES: 'SELECT issue_id, issue_description as description,  issue_status as status, issue_resolved_date as resolved_date, issue_created_on as created_on, issue_last_modified_on as last_modified_on, project_name FROM v_customer_issues_details WHERE customer_id = ? AND issue_resolved_date IS NULL;',
  },
  EMPLOYEE_VIEWS: {
    VIEW_PROJECTS_IN_DEPARTMENT: 'select * from v_projects_in_department WHERE dept_name = ? OR dept_id = ?;',
    VIEW_ISSUES_CREATED_BY_CUSTOMER: 'SELECT * FROM v_customer_issues_details WHERE customer_id = ?;',
    VIEW_RESOLVED_ISSUES_BY_PROJECT: 'SELECT * FROM v_customer_issues_details WHERE issue_resolved_date IS NOT NULL AND issue_resolved_date <= DATE(NOW()) AND project_id = ?;',
    VIEW_ONGOING_ISSUES_BY_PROJECT: 'SELECT * FROM v_customer_issues_details WHERE issue_resolved_date IS NULL AND project_id = ?;',
    // VIEW_ONGOING_ISSUES_BY_PROJECT: 'SELECT * FROM v_customer_issues_details WHERE project_id = ?;',
    VIEW_PROJECTS_OF_EMPLOYEE: 'SELECT DISTINCT project_id, project_name, dept_id FROM v_employee_issues_details WHERE assignee_id = ?;',
    VIEW_UNASSIGNED_ISSUES: 'SELECT issue_id, description, status, resolved_date, created_on, last_modified_on, project_id, project_name, dept_id FROM v_employee_issues_details WHERE assignee_id IS NULL;',
  },
  CHECKS: {
    IS_EMPLOYEE_MANAGER: 'SELECT * FROM department WHERE manager_id = ?;',
    IS_EMPLOYEE_ASSOCIATED_WITH_ISSUE: 'SELECT * FROM issues_assignment WHERE employee_id = ? AND issue_id = ? AND assigned_on = (SELECT MAX(assigned_on) FROM issues_assignment WHERE issue_id = ?);',
    IS_CUSTOMER_ISSUE_OWNER: 'SELECT * FROM customer_issues_mapping WHERE customer_id = ? AND issue_id = ?;',
    IS_PROJECT_ENDED: 'SELECT * FROM projects WHERE id = ? AND end_date IS NOT NULL AND end_date <= DATE(NOW());',
  },
};
