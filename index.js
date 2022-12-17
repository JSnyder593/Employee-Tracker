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

function init() {
    departmentArr = []
    roleArr = []
    employeeArr = []

    inquirer.prompt([
        {
            name: "question",
            type: "list",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee's role", "Quit"]
        }
    ]).then(answers => {
        switch (answers.question) {
            case "View all departments":
                console.log("Viewing all departments!")
                viewDepartments();
                break;

            case "View all roles":
                console.log("Viewing all roles!")
                viewRoles()
                break;

            case "View all employees":
                console.log("Viewing all employees!")
                viewEmployees()
                break;

            case "Add a department":
                console.log("Adding a department!")
                addDepartment()
                break;

            case "Add a role":
                console.log("Adding a role!")
                addRole ()
                break;

            case "Add an employee":
                console.log("Adding an employee!")
                addEmployee()
                break;

            case "Update an employee's role":
                console.log("Updating an employee's role!")
                updateEmployee ()
                break;

            default:
                console.log("See you next time!")
                break;
        }
    })
}

function viewDepartments () {
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

function viewRoles () {
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

function viewEmployees () {
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

function addDepartment () {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        },
    ]).then(answer => {
        db.query(`INSERT INTO departments (name) VALUES ("${answer.departmentName}")`)
        init();
    })
}

function addRole () {
    // departmentArr = []
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
    ]).then(answer => {
        db.query(`INSERT INTO roles (title, department, salary) VALUES 
        ("${answer.roleName}", ${answer.question}, '${answer.roleSalary}')`)
        init();
    })
}

function addEmployee () {
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
            choices: [0,1]
        }
    ]).then(answer => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
        ("${answer.firstName}", "${answer.lastName}", ${answer.question1}, ${answer.question2})`)
        init();
    })
}

function updateEmployee () {
    findEmployees ()
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
    ]).then(answer => {
        db.query(`UPDATE employees SET role_id = ${answer.question2} WHERE id = ${answer.question1}`)
        init();
    })
}

init();
