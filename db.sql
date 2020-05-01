DROP DATABASE IF EXISTS ems;
CREATE DATABASE EMS;
USE EMS;

CREATE TABLE department (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id VARCHAR(36) NOT NULL
);

CREATE TABLE employee (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id VARCHAR(36) NOT NULL,
  manager_id VARCHAR(36)
);

insert into department (id, name)
values 
	('92ae9dd0-60d7-4b43-b92d-65dc2a211b9c', 'Finance'),
	('3890abd3-7451-4242-82c7-25a86f59ac32', 'Executive'),
    ('49f2e734-65d2-4f93-bb03-bb71d38a06dd', 'Operations');
    
insert into role (id, title, salary, department_id)
values
	('7e80e6df-dc81-40a9-8108-4ce929643fa8', 'Chief Executive Officer', 100000.00 , '3890abd3-7451-4242-82c7-25a86f59ac32'),
    ('b941dff2-7ce8-4484-ac6d-b6f20ca7ea8a', 'Chief Financial Officer', 95000.00, '3890abd3-7451-4242-82c7-25a86f59ac32'),
    ('60eedada-2edb-4f14-a7b0-11eacdc9492d', 'Operations Manager', 70000.00, '49f2e734-65d2-4f93-bb03-bb71d38a06dd'),
    ('1572a41c-8050-4924-ab89-aefb86c91941', 'Finance Manager', 70000.00, '92ae9dd0-60d7-4b43-b92d-65dc2a211b9c'),
    ('f94b1199-05b3-4256-94df-4c0a9bf2895d', 'Finance Assistant', 50000.00, '92ae9dd0-60d7-4b43-b92d-65dc2a211b9c'),
    ('d55edcc2-419f-463f-a473-b75dd00ed7ef', 'Engineer', 55000.00, '49f2e734-65d2-4f93-bb03-bb71d38a06dd');
    
insert into employee (id, first_name, last_name, role_id, manager_id)
values
	('59b1c32b-b431-41df-a330-1a4b21445fb9', 'Homer', 'Simpson', '7e80e6df-dc81-40a9-8108-4ce929643fa8', ''),
    ('0aa78d4a-3700-4f69-b1bc-6909f0ae2d95','Lisa', 'Simpson', 'b941dff2-7ce8-4484-ac6d-b6f20ca7ea8a', '59b1c32b-b431-41df-a330-1a4b21445fb9'),
    ('5fc5916d-7fe2-4412-a8fd-58bfd6e36d70', 'Bart', 'Simpson', '60eedada-2edb-4f14-a7b0-11eacdc9492d','59b1c32b-b431-41df-a330-1a4b21445fb9'),
    ('f0510d4f-ed98-4ace-8967-7250f4fca1da', 'Ned', 'Flanders', '1572a41c-8050-4924-ab89-aefb86c91941','0aa78d4a-3700-4f69-b1bc-6909f0ae2d95'),
    ('367381d1-c87f-4108-9c80-c5ee5c091dd4', 'Edna', 'Krabappel', 'f94b1199-05b3-4256-94df-4c0a9bf2895d','f0510d4f-ed98-4ace-8967-7250f4fca1da'),
    ('0d03ae1f-be28-46f8-991c-b4a9b2a80675', 'Clancy', 'Wiggum', 'd55edcc2-419f-463f-a473-b75dd00ed7ef','5fc5916d-7fe2-4412-a8fd-58bfd6e36d70'),
    ('18fde022-67b5-4161-a517-ae571b4ea731', 'Kirk', 'Van Houten', 'd55edcc2-419f-463f-a473-b75dd00ed7ef','5fc5916d-7fe2-4412-a8fd-58bfd6e36d70');