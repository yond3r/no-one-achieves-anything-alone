// I copied over a portion of (semi-working to fully-working code) over from my original server. I've found it better to just completely restart, on occasion. I think I'm at this point with this one.

const mysql = require('mysql2');
const inquirer = require('inquirer');
// let db = require('mysql2/typings/mysql/lib/Connection');


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
                'Add a department',
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
    db.query('SELECT * FROM roles', function(err, data){
        if (err) throw err;
            console.table(res);
        options();
    })};

function addDepartments(){
    inquirer.prompt ([
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of this department?"
        },
    ]).then(function (response){
        db.query("INSERT INTO departments SET ? ",
        {
            name: response.departmentName,
        },
        function (err, res){
            if (err) throw err;
                console.log(res.affectedRows + "added!");
            options();
        })})};

function addRoles(){
    let departments = [];

    db.query("SELECT * FROM departments", function(err, data){
        if (err) throw err;
            for (let i = 0; i < data.length; i++){
                departments.push({
                    name: data[i].name,
                    value: data[i].id
                })
            }
        })
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "what is the employee's role/title?"
            },
            {
                name: "salary",
                type: "input",
                message: "what is the wage for this role?"
            },
            {
                name: "departmentsId",
                type: "list",
                message: "What is this employee's department?"
            },

        ]).then(function (response){
            db.query("INSERT INTO roles SET ?",
            {
                title: response.title,
                salary: response.salary,
                departments_Id: response.departmentsId
            },
            function (err, res){
                if (err) throw err;
            })
                console.log("Added!");
            options();
        })};
            
function addEmployee(){
    let roles = [];
    let manager_id = [];

    db.query("SELECT * FROM roles", function (err, res){
        if (err) throw err;
            for (let i = 0; i < res.length; i++){
                roles.push({
                    name: res[i].title,
                    value: res[i].id
                })};


                db.query("SELECT * FROM employees", function(err, res2){
                if (err) throw err;
                    for (let i = 0; i < res2.length; i++){
                        manager_id.push({
                            name: res2[i].first_name,
                            value:res2[i].role_id
                    })};

        inquirer.prompt ([
                    {
                        name: "first_name",
                        type: "input",
                        message: "Please enter the name of the employee."
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Please enter the last name of the employee."
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What is the employee's role at this company?",
                        choices: roles
                    },
                    {
                        name: "managerId",
                        type: "list",
                        message: "Please add the manager for this intended employee.",
                        choices: manager_id
                    },
                ]).then(function (response) {
                    db.query("INSERT INTO employees SET ? ",
                    {
                            first_name: response.first_name, 
                            last_name: response.last_name,
                            roles_id: response.role,
                            manager_id: response.manager_id
                    },
                        function (err, res){
                            if (err) throw err;
                            console.log(res.affectedRows + "added!");
                                options();
        })})})})};

function updateRoles(){
    let employee = [];
    let new_role = [];

    db.query("SELECT * FROM employees", function(err, res){
            if (err) throw err;
                for (let i=0; i < res.length; i++){
                    employee.push({
                        name: res[i].title,
                        value: res[i].id
                    })
                }
    db.query("SELECT * FROM roles", function(err, res2){
            if (err) throw err;
                for (let i=0; i < res2.length; i++){
                    new_role.push({
                        name: res2[i].title,
                        value: res2[i].id
                    })
                }

                inquirer.prompt([
                    {
                        name: "employeeUpdate",
                        type: "list",
                        message: "Please pick the applicable employee that you'd like to update!",
                        choices: employee
                    },
                    {
                        name: "rolesUpdate",
                        type: "list",
                        message: "Please add the new role for the intended employee.",
                        choices: new_role
                    },
                ]).then(function (response){
                    db.query("UPDATE employees SET ? WHERE ?", [
                        {
                            role_id: response.roleUpdate,
                        },
                        {
                            id: response.employeeUpdate,
                        },
                        function (err, res){
                            if (err) throw err;
                                console.log(res.affectedRows + "updated!");
                                    options();
            }])})})})};

    //delete an role
    function deleteRoles(){
        let roles = [];
        db.query('SELECT * FROM roles', function (err, data){
                if (err) throw err;
                    for (let i = 0; i < data.length; i++){
                        roles.push({
                            name: data[i].title,
                            value: data[i].id
                        })
                    }
                inquirer.prompt ([
                    {
                        name: "deleteRoles",
                        type: "list",
                        message: "What role would you like to delete?",
                        choices: roles
                    },
                ]).then(function (response){
                    db.query("DELETE FROM roles WHERE ?", [
                        {
                            id: response.deleteRoles,
                        },
                    ],
                        function (err, res) {
                            if (err) throw (err);
                                console.log(res.affectedRows + "deleted!");
                                    options();
                        });
                    });
                })};

    function deleteEmployee(){
        let employees = [];

        db.query("SELECT * FROM employees", function (err, data) {
            if (err) throw (err);
            for (let i = 0; i < data.length; i++){
                employees.push({
                    name: data[i].first_name,
                    value: data[i].id
                })
            }
            inquirer.prompt ([
                {
                    name: "deleteEmployee",
                    type: "list",
                    message: "Please select the employee you wish to remove",
                    choices: employees
                },
            ]).then(function (response){
                db.query("DELETE FROM employees WHERE ?", [
                    {
                        id: response.deleteEmployee,
                    },
                ],
                    function (err, res){
                        if (err) throw (err);
                        console.log(res.affectedRows + "deleted!");
                            options();
                    }
                )
            })
        })
    }

    //exit this database! Bye-bye!
    function exitDatabase(){
        db.end();
    };