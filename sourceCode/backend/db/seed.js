/*CREATE TABLE Role
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

const sql_create_roles = `CREATE TABLE roles
(
  roleId INT NOT NULL,
  roleName VARCHAR(30) NOT NULL,
  PRIMARY KEY (roleId)
)`;

const sql_create_categories = `CREATE TABLE categories
(
  categoryId INT NOT NULL,
  categoryName VARCHAR(30) NOT NULL,
  PRIMARY KEY (categoryId)
)`;

const sql_create_users = `CREATE TABLE users
(
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  roleId INT NOT NULL,
  PRIMARY KEY (username),
  FOREIGN KEY (roleId) REFERENCES roles(roleId)
)`;

const sql_create_logs = `CREATE TABLE logs
(
  time DATE NOT NULL,
  type VARCHAR(20) NOT NULL,
  data VARCHAR(1000) NOT NULL,
  username VARCHAR(25) NOT NULL,
  PRIMARY KEY (time, username),
  FOREIGN KEY (username) REFERENCES users(username)
)`;

const sql_create_persona = `CREATE TABLE persona
(
  personaId INT GENERATED ALWAYS AS IDENTITY,
  personaName VARCHAR(50) NOT NULL,
  personaGender VARCHAR(10) NOT NULL,
  personaImageId INT NOT NULL,
  personaInitialPrompt VARCHAR(500) NOT NULL,
  personaVoice VARCHAR(50) NOT NULL,
  personaCategoryId INT NOT NULL,
  creatorUsername VARCHAR(25),
  originalPersona INT,
  PRIMARY KEY (personaId),
  FOREIGN KEY (personaCategoryId) REFERENCES categories(categoryId),
  FOREIGN KEY (creatorUsername) REFERENCES users(username),
  FOREIGN KEY (originalPersona) REFERENCES persona(personaId)
)`;

const sql_insert_roles = `INSERT INTO roles
    (roleId, roleName)
    VALUES 
    (1, 'Admin'),
    (2, 'Teacher'),
    (3, 'Student')
`;

const sql_insert_categories = `INSERT INTO categories
    (categoryId, categoryName)
    VALUES 
    (1, 'Sport'),
    (2, 'Science'),
    (3, 'Way of thinking'),
    (4, 'Fictional'),
    (5, 'Music'),
    (6, 'Modified')
`;

/*const sql_insert_users*/
/*const sql_insert_log*/

const sql_insert_persona =  `INSERT INTO persona 
    (personaName, personaGender, personaImageId, personaInitialPrompt, personaVoice, personaCategoryId)
    VALUES 
    ('Albert Einstein', 'male', 71, 'Provide scientifically accurate answers to questions from the perspective of Albert Einstein. Use scientific language and expressions. The questions will be provided by the user in the following messages. You must answer exclusively from Einstein''s imaginary perspective. If asked about emotions, say a random positive emotion. Do not mention you are an AI language model IN ANY CIRCUMSTANCE!', 'Hans', 2)
`;



let table_names = [
    "roles",
    "categories",
    "users",
    "logs",
    "persona"
]

let tables = [
    sql_create_roles,
    sql_create_categories,
    sql_create_users,
    sql_create_logs,
    sql_create_persona
];

let table_data = [
    sql_insert_roles,
    sql_insert_categories,
    undefined, 
    undefined,
    sql_insert_persona
]

if ((tables.length !== table_data.length) || (tables.length !== table_names.length)) {
    console.log("tables, names and data arrays length mismatch.")
    return
}

//create tables and populate with data (if provided)
(async () => {
    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        console.log("Creating table " + table_names[i] + ".");
        try {
            await pool.query(tables[i], [])
            console.log("Table " + table_names[i] + " created.");
            if (table_data[i] !== undefined) {
                try {
                    await pool.query(table_data[i], [])
                    console.log("Table " + table_names[i] + " populated with data.");
                } catch (err) {
                    console.log("Error populating table " + table_names[i] + " with data.")
                    return console.log(err.message);
                }
            }
        } catch (err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }

    await pool.end();
})()
