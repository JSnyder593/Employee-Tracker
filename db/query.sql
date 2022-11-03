SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT departments.id AS ID, departments.department_name AS Department FROM departments;

SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary from Roles;

INNER JOIN roles.id, roles.title FROM roles ON employees.role_id = roles.title;