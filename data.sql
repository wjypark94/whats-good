CREATE DATABASE whatsGood;
USE whatsGood;

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE usersLists (
    list_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(200) NOT NULL,
    listName VARCHAR(200) NOT NULL,
    FOREIGN KEY(list_id) REFERENCES users(id)
);