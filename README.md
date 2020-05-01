#  MYSQL Homework: Employee Tracker
Homework Week 12 - Employee Tracker<br> 
Author: Foti Mougos<br>
[Deployed At Github](https://foteye.github.io/Wk12-MYSQL-EmployeeTracker-FotiMougos/ "Deployed at Github")

### Brief:

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

#### SQL Schema:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

#### Features: 

MVP1

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

MVP2

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

### Lessons Learned:

  * Added Features and Schema notes to Readme, I think they're really relevant here, and can help people understand the function of the program.
  * Starting homework early = happy life
