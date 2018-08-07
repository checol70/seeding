/*

to use this just ctrl + f <name> and replace all instances with the name you want.

*/

CREATE DATABASE <name>_db;
USE <name>_db;

-- Create the table plans.
CREATE TABLE <name>s
(
id int NOT NULL AUTO_INCREMENT,
<name> varchar(255) NOT NULL,
PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO <name>s (<name>) VALUES ('<name>');