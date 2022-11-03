const DB = require('./db/index.js')
const db = require("./db/connection.js");
const inquirer = require('inquirer');
const cTable = require('console.table')

// initial function
askQuestion = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
        }
    ]).then((ans)=>{
        switch (ans.choice){
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
};

// functions for each choice

addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "role",
            message: "What is the employee's role?",
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the employee's manager?",
        }
    ]).then((ans) => {
    })
};

updateRole = () => {    
    inquirer.prompt([
    {
        type: "input",
        name: "employee",
        message: "Which employee's role do you want to update?",
    }.then((ans) => {
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                choices: employees
            }    
        ])
    }),
    {
        type: "input",
        name: "role",
        message: "What role do you want to assign the selected employee?",
    }
    ]).then((ans) => {})
};

viewRoles = () => {
    db.query(`SELECT roles.id AS ID, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary FROM roles`, function (err, results) {
        console.log(results);
    })
};
//show all roles

addRole = () => {
    inquirer.prompt([
    {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
    },
    {
        type: "input",
        name: "department",
        message: "Which department does the role belong to?"
    }
    ]).then((ans) => {})
};

viewDepartments = () => {
    db.query(`SELECT departments.id AS ID, departments.department_name AS Department FROM departments;`, function (err, results) {
        console.table(results);
    })
};
//show all departments

addDepartment = () => {
    inquirer.prompt([
    {
        type: "input",
        name: "department",
        message: "What is the name of the department?"
    }
    ]).then((ans) => {})
};

//initializes terminal
askQuestion();

//View All Departments
//id
//department name (engineering, finance, legal, sales)

//View All Roles 
//id
//title (Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer) 
//department name
//salary 

//View All Employees
//id
//first_name
//last_name
//title
//department
//salary
//manager




