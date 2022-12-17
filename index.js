const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let departmentArr = []
let roleArr = []
let employeeArr = []


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log(`Connected to database.`)
);

//initializing function with arrays and switch cases for each possible choice
init = () => {
    departmentArr = []
    roleArr = []
    employeeArr = []

    inquirer.prompt([
        {
            name: "question",
            type: "list",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Departments", "View All Roles", "Add Role", "Add Department"]
        }
    ]).then(ans => {
        switch (ans.choice) {

            case "View All Employees":
                viewEmployees()
                break;
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployee()
                break;
            case "View All Roles":
                viewRoles()
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Role":
                addRole()
                break;
            case "Add Department":
                addDepartment()
                break;

            default:
                console.log("See you next time!")
                break;
        }
    })
}

//views all employees
viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('')
        console.table(result)
        console.log('')
        init();
    });
}

//adds new employee
addEmployee = () => {
    findRoles()
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "lastName"
        },
        {
            name: "question1",
            type: "list",
            message: "What is the id of the role this employee belongs to?",
            choices: roleArr
        },
        {
            name: "question2",
            type: "list",
            message: "Is this person a manager? (0 for no, 1 for yes)",
            choices: [0, 1]
        }
    ]).then(ans => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
        ("${ans.firstName}", "${ans.lastName}", ${ans.question1}, ${ans.question2})`)
        init();
    })
}

//updates employee
function updateEmployee() {
    findEmployees()
    findRoles()
    inquirer.prompt([
        {
            type: "input",
            message: "click enter to proceed",
            name: "null"
        },
        {
            name: "question1",
            type: "list",
            message: "What is the id of the employee you're trying to update?",
            choices: employeeArr
        },
        {
            name: "question2",
            type: "list",
            message: "What is the id of the role this employee belongs to?",
            choices: roleArr
        }
    ]).then(ans => {
        db.query(`UPDATE employees SET role_id = ${ans.question2} WHERE id = ${ans.question1}`)
        init();
    })
}


//views all roles
viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('')
        console.table(result)
        console.log('')
        init();
    });
}

//adds new role
addRole = () => {
    findDepartments()
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "roleName"
        },
        {
            name: "question",
            type: "list",
            message: "What is the id of the department this role belongs to?",
            choices: departmentArr
        },
        {
            type: "input",
            message: "What is the salary of the new role? (do not include commas)",
            name: "roleSalary"
        }
    ]).then(ans => {
        db.query(`INSERT INTO roles (title, department, salary) VALUES 
        ("${ans.roleName}", ${ans.question}, '${ans.roleSalary}')`)
        init();
    })
}

//views all departments
viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('')
        console.table(result)
        console.log('')
        init();
    });
}

//adds new department
addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        },
    ]).then(ans => {
        db.query(`INSERT INTO departments (name) VALUES ("${ans.departmentName}")`)
        init();
    })
}

//initializing function
init();
