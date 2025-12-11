CREATE DATABASE IF NOT EXISTS SITE_NQ_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE SITE_NQ_db;

CREATE TABLE users (

       id INT,

       username CHAR(50) UNIQUE NOT NULL,

       password CHAR(255) NOT NULL,

       role ENUM('admin', 'user') DEFAULT 'user',

       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

       constraint pk_id primary key (id)
);

CREATE TABLE portfolio_menu_admin(

    id_menu int,

    nom_menu char(50) NOT NULL,

    describ_menu char(255) not null,
);


INSERT INTO users(
    id, username, password, role
)
VALUES(
    1,'admin251','$2b$10$WhVPAidf4HNTxP2Zq4IaU.qE6d7yuAYyAbvuYd9sv6NS3rQZSHKpy','admin'
)



INSERT INTO portfolio_menu_admin(
    nom_menu,describ_menu
)
VALUES(
    1,'Qui suis-je','détaile de que qui je suis et de ma personnalité'
),(
    2,'Parcourt scolaire','Détails de mon parcourt scolaire'
);