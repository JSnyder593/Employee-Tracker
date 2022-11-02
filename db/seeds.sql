USE tracker_db;

-- Departments
INSERT INTO departments (id, department_name)
VALUES (1, 'Engineering');

INSERT INTO departments (id, department_name)
VALUES (2, 'Finance');

INSERT INTO departments (id, department_name)
VALUES (3, 'Legal');

INSERT INTO departments (id, department_name)
VALUES (4, 'Sales');

-- Roles
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 70000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ('Salesperson', 50000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', 185000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 120000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('Account Manager', 90000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 75000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('Legal Team Lead', 185000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('Lawyer', 120000, 3);

-- Legal Team
INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Amari', 'Ana', 7, NULL);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Caledonia', 'Elizabeth', 8, 1);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Cassidy', 'Cole', 8, 1);

-- Engineering Team
INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Vaswani', 'Satya', 3, NULL);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Correia dos Santos', 'Lucio', 4, 2);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Lindholm', 'Brigitte', 4, 2);

-- Sales Team
INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Augustin', 'Jean-Baptiste', 1, NULL);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Lacrois', 'Amelie', 2, 3);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Zhou', 'Mei-Ling', 2, 3);

-- Finance Team
INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Rutledge', 'Mako', 5, NULL);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Shimada', 'Genji', 6, 4);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Fawkes', 'Jameson', 6, 4);

INSERT INTO employees (last_name, first_name, role_id, manager_id)
VALUES ('Zenyatta', 'Tekhartha', 6, 4);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;