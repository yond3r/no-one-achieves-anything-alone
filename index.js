const mysql = require('mysql2')
const express = require('express');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

//connections between sql server & sql database
connection.connect(function (err) {
    if (err) throw err;
    options();
});

//prompts uer
function options() {
    inquirer
        .prompt({
            name: 'pick',
            type: 'list',
            message: 'Welcome! Here is your employee database! Please pick between the following options:',
            choices: [
                'View All Employees',
                'View All Departments',
                'Add an employee',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                'Exit!'
            ]
        }).then(function (answer) {
            switch (answer.pick) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'Exit!':
                    exitDatabase();
                    break;
                default:
                    break;
            }
        })
    };

//view all employees within this database!
function viewEmployees() {
    let query = 'SELECT * FROM employees';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + 'here are all the employees!!');
        console.table('All Employees', res)
        options();
    })
};

//view all departments within this database!
function viewDepartments() {
    let query = 'SELECT * FROM departments';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments', res);
        options();
    })
};

function viewRoles() {
    let query = 'SELECT * FROM roles';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles', res);
        options();
    })
};

function addEmployee() {
    let query = 'SELECT * FROM roles';
    connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "Please enter the employee's first name."
            },
            {
                name: 'last_name',
                type: 'input',
                message: "Please enter the employee's last name."
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "Please enter the employee's Identification Number here."
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    var rolesArray = [];
                    for (let i = 0; i < res.length; i++) {
                        rolesArray.push(res[i].title);
                    }
                    return rolesArray;
                },
                message: "What is the role of this valued employee? Please enter below."
            }
        ]).then(function (answer) {
            let roles_id;
            for (let a = 0; a < res.lenth; a++) {
                if (res[a].title == answer.role) {
                    roles_id = res[a].id;
                    console.log(role_id)
                }
                return rolesArray;
            }
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    role_id: role_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log('Woo-hoo!! This employee was added!! Go you!! (-:');
                    options();
                })
            })
        })
    };

function addDepartments(){
    inquirer.prompt ([
        {
            name: 'newDepartments'



        }
    ])
}














