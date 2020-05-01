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
                "Quit"
            ]
        })
            .then(async function(answer) {
            switch (answer.action) {
            case "View Departments":
                console.table(await readTable("department"));
                break;

            case "View Roles":
                console.table(await readTable("role"));
                break;

            case "View Employees":
                console.table(await readTable("employee"));
                break;

            case "Quit":
                quit = true;
                break;
            }
        });
    }
    
    // console.table(await readTable("department"));
    // await createDepartment("Catering");
    // console.table(await readTable("department"));
    connection.end();
    
}

/*=====================
    MENU FUNCTIONS
======================*/



/*=====================
    CREATE FUNCTIONS
======================*/
async function createEmployee(first, last, roleID, managerID){
    await query(`INSERT INTO department SET ?`,{
        id : uuid.v4(),
        first_name : first,
        last_name : last,
        role_id : roleID,
        manager_id : (managerID || '')
  });
}

async function createRole(title, salary, departmentID){
    await query(`INSERT INTO department SET ?`,{
        id : uuid.v4(),
        title : title,
        salary : salary,
        department_id : departmentID
  });
}

async function createDepartment(name){
    await query(`INSERT INTO department SET ?`,{
          id : uuid.v4(),
          name : name
    });
}

/*=====================
    READ FUNCTIONS
======================*/

// Gets the data out of a table
async function readTable(table){
    let data;
    try {    
        data = await query(`SELECT * FROM ${table}`);
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
