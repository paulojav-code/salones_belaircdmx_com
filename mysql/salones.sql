USE salones_belaircdmx_t;

DROP TABLE IF EXISTS itinerario;
DROP TABLE IF EXISTS eventos_info;
DROP TABLE IF EXISTS users;
-- DESPUES DE AQUI VAN LAS INDEPENDIENTES POR LO QUE PRIMERO SE BORRAN LAS DEPENDIENTES
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS salones;
DROP TABLE IF EXISTS type_styles;
DROP TABLE IF EXISTS type_status;
DROP TABLE IF EXISTS type_users;

CREATE TABLE type_users(
    `id_type_users` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_type_users)
);

CREATE TABLE type_styles(
    `id_type_styles` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_type_styles)
);

CREATE TABLE type_status(
    `id_type_status` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_type_status)
);

CREATE TABLE salones (
    `id_salones` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_salones)
);

CREATE TABLE eventos(
    `id_eventos` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_eventos)
);

CREATE TABLE users(
    `id_users` INT NOT NULL AUTO_INCREMENT,
    `id_type_users` INT,
    `username` VARCHAR(50),
    `password` VARCHAR(250),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_users),
    KEY fk_reference_00(id_type_users),
    CONSTRAINT fk_reference_00 FOREIGN KEY(id_type_users) REFERENCES type_users(id_type_users)
);

CREATE TABLE itinerario(
    `id_itinerario` INT NOT NULL AUTO_INCREMENT,
    `id_salones` INT,
    `id_eventos` INT,
    `name` VARCHAR(100),
    `date` DATETIME, -- ES PARA FECHA PERO INCLUYE HORA 
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_itinerario),
    KEY fk_reference_01(id_salones),
    CONSTRAINT fk_reference_01 FOREIGN KEY(id_salones) REFERENCES salones(id_salones),
    KEY fk_reference_02(id_eventos),
    CONSTRAINT fk_reference_02 FOREIGN KEY(id_eventos) REFERENCES eventos(id_eventos)
);

CREATE TABLE eventos_info(
    `id_evento_info` INT NOT NULL AUTO_INCREMENT,
    `id_eventos` INT,
    `id_salones` INT,
    `id_type_status` INT,
    `date` DATETIME,
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_evento_info),
    KEY fk_reference_03(id_eventos),
    CONSTRAINT fk_reference_03 FOREIGN KEY(id_eventos) REFERENCES eventos(id_eventos), 
    KEY fk_reference_04(id_salones),
    CONSTRAINT fk_reference_04 FOREIGN KEY(id_salones) REFERENCES salones(id_salones),
    KEY fk_reference_05(id_type_status),
    CONSTRAINT fk_reference_05 FOREIGN KEY(id_type_status) REFERENCES type_status(id_type_status)
);


