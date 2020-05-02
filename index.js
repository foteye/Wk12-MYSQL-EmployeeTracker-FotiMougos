const fs = require('fs');
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const util = require('util');
const uuid = require('uuid');

const readFile = util.promisify(fs.readFile);
const password = getPassword();
const connection = connectDatabase("ems", password);
const query = util.promisify(connection.query).bind(connection);

main();

async function main() {
    var quit = false;

    while (!quit){
        await inquirer
            .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Create Department",
                "Create Role",
                "Create Employee",
                "Update Employee Role",
                "Quit"
            ]
        })
            .then(async function(answer) {
            switch (answer.action) {
            case "View Departments":
                console.table(await readDepartments());
                break;

            case "View Roles":
                console.table(await readRoles());
                break;

            case "View Employees":
                console.table(await readEmployees());
                break;

            case "Create Department":
                console.log(await createDepartment());
                break;

            case "Create Role":
                console.log(await createRole());
                break;

            case "Create Employee":
                console.log(await createEmployee());
                break;

            case "Update Employee Role":
                console.log(await updateEmployeeRole());
                break;

            case "Quit":
                quit = true;
                break;
            }
        });
    }
    
    connection.end();
    
}

/*=====================
    UPDATE FUNCTIONS
======================*/

async function updateEmployeeRole(){
    const employees = await readEmployees();
    const roles = await readRoles();
    const choiceEmployees = [];
    const choiceRoles = [];

    for (var employee of employees){
        choiceEmployees.push({name : `${employee.FirstName} ${employee.LastName} (${employee.Title})`, value: employee.id});
    }

    for (var role of roles){
        choiceRoles.push({name : `${role.title} (${role.department})`, value: role.id});
    }
    
    await inquirer
    .prompt([{
        name: 'employeeID',
        type: 'list',
        message: 'Please select whose role you would like to change',
        choices: choiceEmployees
    },
    {
        name: 'roleID',
        type: 'list',
        message: 'Please select the new role of this user',
        choices: choiceRoles

    }])
    .then(async answers => {
        await query(`
            UPDATE employee
            SET 
                role_id = "${answers.roleID}"
            WHERE
                id = "${answers.employeeID}";`
        );
    });
    return "Done!";
}

/*=====================
    CREATE FUNCTIONS
======================*/
async function createEmployee(){
    const roles = await readRoles();
    const managers = await readEmployees();

    const choiceRoles = [];
    const choiceManagers = [];

    for (var role of roles){
        choiceRoles.push({name : `${role.title} (${role.department})`, value: role.id});
    }

    for (var manager of managers){
        choiceManagers.push({name : `${manager.FirstName} ${manager.LastName} (${manager.Title})`, value: manager.id});
    }
    choiceManagers.push({name : "None", value : ''});

    await inquirer
    .prompt([{
        name: 'firstName',
        message: 'Please enter the first name of the employee'
    },
    {
        name: 'lastName',
        message: "Please enter the last name of the employee"
    },
    {
        name: 'roleID',
        type: 'list',
        message: 'Please select the role of this user',
        choices: choiceRoles

    },
    {
        name: 'managerID',
        type: 'list',
        message: 'Please select the role of this user',
        choices: choiceManagers
    }])
    .then(async answers => {
        await query(`INSERT INTO employee SET ?`,{
            id : uuid.v4(),
            first_name : answers.firstName,
            last_name : answers.lastName,
            role_id : answers.roleID,
            manager_id : answers.managerID
        });
    });
    return "Done!";
}

async function createRole(){
    var departments = await readDepartments();
    var choiceDepartments = [];

    for (var department of departments){
        choiceDepartments.push({name : department.name, value: department.id});
    }

    await inquirer
    .prompt([{
        name: 'roleName',
        message: 'Please enter the name of the role'
    },
    {
        name: 'salary',
        message: "Please enter the salary for this role"
    },
    {
        name: 'deptID',
        type: 'list',
        message: 'Please select the department this role belongs to',
        choices: choiceDepartments

    }])
    .then(async answers => {
        await query(`INSERT INTO role SET ?`,{
            id : uuid.v4(),
            title : answers.roleName,
            salary : answers.salary,
            department_id : answers.deptID
        });
    });
    return "Done!";
}

async function createDepartment(){
    await inquirer
    .prompt({
        name: 'deptName',
        message: 'Please enter the name of the department'
    })
    .then(async answers => {
        await query(`INSERT INTO department SET ?`,{
          id : uuid.v4(),
          name : answers.deptName
        });
    });
    return "Done!";
}

/*=====================
    READ FUNCTIONS
======================*/

// Gets the data out of a table
async function readRoles(){
    let data;
    try {    
        data = await query(`SELECT r.id, r.title, r.salary, d.name department FROM role r INNER JOIN department d ON d.id = r.department_id`);
    } catch (e) {
        console.log(e);
    }
    return data;
}

async function readDepartments(){
    let data;
    try {    
        data = await query(`SELECT id, name FROM department`);
    } catch (e) {
        console.log(e);
    }
    return data;
}

async function readEmployees(){
    let data;
    try {    
        data = await query(`SELECT 
                                e.id, e.first_name FirstName, e.last_name LastName, r.title Title, m.first_name ManagerFirst, m.last_name ManagerLast
                            FROM 
                                employee e 
                            INNER JOIN 
                                role r ON r.id = e.role_id
                            LEFT JOIN
                                employee m ON m.id = e.manager_id
                            `);
    } catch (e) {
        console.log(e);
    }
    return data;
}

/*=====================
    DATABASE FUNCTIONS
======================*/

function connectDatabase(database, password) {
    const connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: password,
        database: database
    });
    connection.connect(function (err) {
        if (err) 
            throw err;
        console.log("connected as id " + connection.threadId + "\n");
    });
    return connection;
}

// Function to obfuscate my DB password :) I've gitignored it. You can add a file in your dir called password.txt with your password in it.
function getPassword() {
    try {
        var data = fs.readFileSync('password.txt', 'utf-8');
        return data;
    } catch {
        return '';
    }
}
