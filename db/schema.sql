DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

-- TABLE CREATION FOR ENTIRE DEPARTMENT --
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);
-- TABLE CREATION FOR ROLES --
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(135) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);
-- TABLE CREATION FOR EMPLOYEES --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(135) NOT NULL,
    last_name VARCHAR(135) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

-- SOURCE seeds.sql; -- can't quite figure out how to route from the db folder without a '/' in the mix, throwing off the source material.