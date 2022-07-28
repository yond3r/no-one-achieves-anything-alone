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
  connection.connect (function (err){
      if (err) throw err;
      options();  
  });

  //prompts uer
  function options(){
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
        }).then(function (answer){
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
    function viewEmployees(){
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res){
            if (err) throw err;
            console.log(res.length + '');
            console.table('' , res)
            options();
        })
    };












