const mysql = require('mysql2')
// const express = require('express');
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
db.connect(function (err) {
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
                'View All Roles',
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
                    addRoles();
                    break;
                case 'Add a department':
                    addDepartments();
                    break;
                case 'Update employee role':
                    updateRoles();
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
    let query = 'SELECT * FROM employees'
        db.query(query, function (err, res){
            if (err) throw err;
                console.table(res)
        options();
})};


//view all departments within this database!
function viewDepartments() {
    let query = 'SELECT * FROM departments';
    db.query(query, function (err, res) {
        if (err) throw err;
            console.table(res);
        options();
    })};

function viewRoles() {
    let query = 'SELECT * FROM roles';
    db.query(query, function (err, res) {
        if (err) throw err;
            console.table(res);
        options();
    })};

function addEmployee() {
    let query = 'SELECT * FROM roles';
    db.query(query, function (err, res) {
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
                name: 'roles_id',
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
                if (res[a].title == answer.roles) {
                    roles_id = res[a].id;
                    console.log(roles_id)
                }
                return rolesArray;
            }
            db.query(
                'INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
                [
                    answer.first_name,
                    answer.last_name,
                    answer.roles_id,
                    answer.manager_id
                ],
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
            name: 'newDepartments',
            type: 'input',
            message: 'Of which department would you like to add?'
        }
    ]).then(function(answer){
        db.query(
            'INSERT INTO departments SET ?',
            {
                name: answer.newDepartments
            });
            let query = 'SELECT * FROM departments';
                db.query(query, function(err, res){
                if (err) throw err;
                console.log('Yee-haw! Your department has been added!! Way to go!!');
                console.table('All Departments:', res);
                options();
            })
        })
    };

    function addRoles(){
        db.query('SELECT * FROM departments', function(err, res){
            if (err) throw err;

            inquirer.prompt([
                {
                    name: 'new_roles',
                    type: 'input',
                    name: 'What new role would you like to add to this valued employee?'
                },
                {
                    name: 'funds',
                    type: 'input',
                    message: 'Please enter the salary of the intended employee. (Please enter a numeric value.)'
                },
                {
                    name: 'departments',
                    type: 'list',
                    choices: function(){
                        let departmentsArray =[];
                        for (let i= 0; i < res.length; i++){
                            departmentsArray.push(res[i].name);
                        }
                        return departmentsArray;
                    }
                }
            ]).then(function (answer){
                let department_id;
                for (let a = 0; a < res.length; a++){
                    if (res[a].name == answer.Departments){
                        department_id = res[a].id;
                    }
                }
            db.query(
                'INSERT INTO roles (new_roles, salary, department_id) VALUES (?,?,?)',
                [
                    answer.new_roles,
                    answer.salary,
                    answer.department_id
                ],
                function (err, res){
                    if (err) throw err;
                    console.log('Yeah!! Your new role has been added! Get excited!!(-:')
                    console.table('All Roles:', res);
                    options();
                })
            })
        })
    };

    //update a role within this database
    function updateRoles(){
    inquirer.prompt ([
    {
        name: 'employeeUpdate',
        type: 'input',
        message: 'Which of these wonderful employees would you like to update?'
    },
    {
        name: 'updateRoles',
        type: 'input',
        message: '& What role would you like to update this employee to?'
    }
    ]).then(function(answer){
        db.query('UPDATE employee SET roles_id=? WHERE first_name=?', [answer.updateRoles, answer.employeeUpdate], function(err, res){
            if (err) throw (err);
                console.table(res);
                    options();
        })
    })};
    
    //delete an employee
    function deleteEmployee(){
//will update @ later time
    };



    //exit this database! Bye-bye!
    function exitDatabase(){
        db.end();
    };