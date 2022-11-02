CREATE TABLE Departments (
    id INT PRIMARY KEY,
    department_name VARCHAR(30)
)

CREATE TABLE Roles (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
)

CREATE TABLE Employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)