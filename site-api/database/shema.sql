CREATE DATABASE IF NOT EXISTS SITE_NQ_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE SITE_NQ_db;

CREATE TABLE IF NOT exists users (

       id INT,

       username CHAR(50) UNIQUE NOT NULL,

       password CHAR(255) NOT NULL,

       role ENUM('admin', 'user') DEFAULT 'user',

       constraint pk_id primary key (id)
);

CREATE TABLE IF NOT exists portfolio_menu_admin(

    id_menu int,

    nom_menu char(50) NOT NULL,

    describ_menu char(255) not null,
    
    constraint pk_id primary key (id_menu)
);


INSERT INTO users(id, username, password,role)
VALUES(1,'admin251','$2b$10$WhVPAidf4HNTxP2Zq4IaU.qE6d7yuAYyAbvuYd9sv6NS3rQZSHKpy','admin');



