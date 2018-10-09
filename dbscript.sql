CREATE DATABASE UserDBT
USE UserDB;

create table user(
        id INT AUTO_INCREMENT PRIMARY KEY,
        first VARCHAR(50) NOT NULL,
        last VARCHAR(50) NOT NULL,
        email VARCHAR(120),
        birth DATE,
        sex CHAR(1),
        phone VARCHAR(12),
        address VARCHAR(255),
        password VARCHAR(20)
        );

INSERT INTO user (first, last, email, birth, sex, phone, address, password) values(
        'Edouard',
        'Le Juge',
        'edouard.lejuge@gmail.com',
        '1986-07-09',
        'M',
        '+33692345633',
        '34 rue de douai, 75009, Paris',
        'efwefrtg4trfg43');

INSERT INTO user (first, last, email, birth, sex, phone, address, password) values(
        'Paul',
        'Le Juge',
        'paul.lejuge@gmail.com',
        '1989-12-31',
        'F',
        '+33692335432',
        '34 rue de Miromesnil, 75008, Paris',
        'wefewijhf7e');