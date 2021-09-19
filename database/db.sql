CREATE DATABASE saver_link;

USE saver_link;

CREATE TABLE users(
	id_user INT(11) NOT NULL,
	fullname VARCHAR(30) NOT NULL,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE TABLE links(
	id_link INT(11) NOT NULL,
	title VARCHAR(100) NOT NULL,
	url VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	id_user INT(11) NULL
);

ALTER TABLE users 
	MODIFY id_user INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT;

ALTER TABLE links
	MODIFY id_link INT(11) PRIMARY KEY AUTO_INCREMENT;

ALTER TABLE links 
	ADD FOREIGN KEY (id_user) REFERENCES users(id_user);