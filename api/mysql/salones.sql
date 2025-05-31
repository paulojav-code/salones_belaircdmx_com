USE db_cdmx_hotel;

DROP TABLE IF EXISTS log;
DROP TABLE IF EXISTS users_permisos;
DROP TABLE IF EXISTS events_meetings;
DROP TABLE IF EXISTS events_screens;
DROP TABLE IF EXISTS events_info;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS screens;
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS assembly;
DROP TABLE IF EXISTS type_status;
DROP TABLE IF EXISTS type_users;


CREATE TABLE type_users(
    `id_type_users` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_type_users)
);
CREATE TABLE type_status(
    `id_type_status` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_type_status)
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
CREATE TABLE meetings (
    `id_meetings` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_meetings)
);
CREATE TABLE screens(
    `id_screens` INT NOT NULL AUTO_INCREMENT,
    `id_meetings` INT,
    `acive` INT DEFAULT 1,
    PRIMARY KEY(id_screens),
    KEY fk_reference_01(id_meetings),
    CONSTRAINT fk_reference_01 FOREIGN KEY(id_meetings) REFERENCES meetings(id_meetings)
);
CREATE TABLE log (
    `id_log` INT NOT NULL AUTO_INCREMENT,
    `id_users` INT,
    `log` TEXT,
    `date` DATETIME,
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_events_log),
    KEY fk_reference_2(id_users),
    CONSTRAINT fk_reference_2 FOREIGN KEY(id_users) REFERENCES users(id_users)
);
CREATE TABLE users_permisos(
    `id_users_permissions` INT NOT NULL AUTO_INCREMENT,
    `id_users` INT,
    `permissions` TEXT,
    `active` INT DEFAULT 1,
    PRIMARY KEY (id_users_permissions),
    KEY fk_reference_3(id_users),
    CONSTRAINT fk_reference_3 FOREIGN KEY(id_users) REFERENCES users(id_users)
);
CREATE TABLE sellers(
    `id_sellers` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `active` INT DEFAULT 1,
    PRIMARY KEY (id_sellers)
);
CREATE TABLE assembly(
    `id_assembly` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255),
    `active` INT DEFAULT 1,
    PRIMARY KEY (id_assembly)
)
CREATE TABLE events(
    `id_events` INT NOT NULL AUTO_INCREMENT,
    `id_sellers` INT, --tabla
    `name` VARCHAR(255),
    `date_start` DATETIME,
    `date_finish` DATETIME,
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_events)
    KEY fk_reference_4(id_sellers),
    CONSTRAINT fk_reference_4 FOREIGN KEY(id_sellers) REFERENCES sellers(id_sellers)
);
CREATE TABLE events_info(
    `id_evento_info` INT NOT NULL AUTO_INCREMENT,
    `id_events` INT,
    `id_type_status` INT,
    `id_assembly` INT, -- tabla  
    `pax` INT,
    `description` VARCHAR(300),
    `active` INT DEFAULT 1
    PRIMARY KEY(id_evento_info),
    KEY fk_reference_05(id_events),
    CONSTRAINT fk_reference_05 FOREIGN KEY(id_events) REFERENCES events(id_events), 
    KEY fk_reference_06(id_type_status),
    CONSTRAINT fk_reference_06 FOREIGN KEY(id_type_status) REFERENCES type_status(id_type_status)
    KEY fk_reference_07(id_assembly),
    CONSTRAINT fk_reference_07 FOREIGN KEY(id_assembly) REFERENCES assembly(id_assembly)
);
CREATE TABLE events_meetings(
    `id_events_meetings` INT NOT NULL AUTO_INCREMENT,
    `id_events` INT,
    `id_meetings` INT,
    `active` INT DEFAULT 1,
    PRIMARY KEY(id_events_meetings)8
    KEY fk_reference_8(id_events),
    CONSTRAINT fk_reference_8 FOREIGN KEY(id_events) REFERENCES events(id_events),
    KEY fk_reference_09(id_meetings),
    CONSTRAINT fk_reference_09 FOREIGN KEY(id_meetings) REFERENCES meetings(id_meetings)
);
CREATE TABLE events_screens(
    `id_events_screens` INT NOT NULL AUTO_INCREMENT,
    `id_events` INT,
    `id_screens` INT,
    `active` INT DEFAULT 1,
    PRIMARY key(id_events_screens),
    KEY fk_reference_10(id_events),
    CONSTRAINT fk_reference_10 FOREIGN KEY(id_events) REFERENCES events(id_events),
    KEY fk_reference_11(id_screens),
    CONSTRAINT fk_reference_11 FOREIGN KEY(id_screens) REFERENCES screens(id_screens)
);