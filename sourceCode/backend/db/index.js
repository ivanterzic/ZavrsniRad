/*
CREATE TABLE Role
(
  roleId INT NOT NULL,
  roleName VARCHAR(30) NOT NULL,
  PRIMARY KEY (roleId)
);

CREATE TABLE Category
(
  categoryId INT NOT NULL,
  categoryName VARCHAR(30) NOT NULL,
  PRIMARY KEY (categoryId)
);

CREATE TABLE User
(
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  roleId INT NOT NULL,
  PRIMARY KEY (username),
  FOREIGN KEY (roleId) REFERENCES Role(roleId)
);

CREATE TABLE Log
(
  time DATE NOT NULL,
  type VARCHAR(20) NOT NULL,
  data VARCHAR(200) NOT NULL,
  username VARCHAR(25) NOT NULL,
  PRIMARY KEY (time, username),
  FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE Persona
(
  personaName VARCHAR(50) NOT NULL,
  personaGender VARCHAR(10) NOT NULL,
  personaId INT NOT NULL,
  personaImageId INT NOT NULL,
  personaInitialPrompt VARCHAR(500) NOT NULL,
  personaVoice VARCHAR(50) NOT NULL,
  personaCategoryId INT NOT NULL,
  creatorUsername VARCHAR(25),
  originalPersona INT,
  PRIMARY KEY (personaId),
  FOREIGN KEY (personaCategoryId) REFERENCES Category(categoryId),
  FOREIGN KEY (creatorUsername) REFERENCES User(username),
  FOREIGN KEY (originalPersona) REFERENCES Persona(personaId)
);
*/

const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ZavRad',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                return res;
            });
    },
    pool: pool
}