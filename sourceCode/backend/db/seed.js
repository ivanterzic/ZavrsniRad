const {Pool} = require('pg');

/*const pool = new Pool({
  user: 'projektadmin',
  host: '161.53.18.24',
  database: 'PersonaApp',
  password: '5tz89rg5489ohizg',
  port: 5432,
});*/

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
  logId INT GENERATED ALWAYS AS IDENTITY,
  time TIMESTAMP NOT NULL,
  type VARCHAR(20) NOT NULL,
  data VARCHAR(10000) NOT NULL,
  username VARCHAR(25) NOT NULL,
  PRIMARY KEY (logId),
  FOREIGN KEY (username) REFERENCES users(username)
)`;

const sql_create_persona = `CREATE TABLE persona
(
  personaId INT GENERATED ALWAYS AS IDENTITY,
  personaName VARCHAR(50) NOT NULL,
  personaGender VARCHAR(10) NOT NULL,
  personaImageId INT NOT NULL,
  personaInitialPrompt VARCHAR(1000) NOT NULL,
  personaVoice VARCHAR(50) NOT NULL,
  personaCategoryId INT NOT NULL,
  creatorUsername VARCHAR(25),
  originalPersona INT,
  PRIMARY KEY (personaId),
  FOREIGN KEY (personaCategoryId) REFERENCES categories(categoryId),
  FOREIGN KEY (creatorUsername) REFERENCES users(username),
  FOREIGN KEY (originalPersona) REFERENCES persona(personaId) ON DELETE CASCADE
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

const sql_insert_users = `INSERT INTO users (username, password, roleid) VALUES ('admin', 'admin123', 1), ('teach', 'teach123', 2), ('student', 'student123', 3)`
/*const sql_insert_log*/

const sql_insert_persona =  `INSERT INTO persona 
    (personaName, personaGender, personaImageId, personaInitialPrompt, personaVoice, personaCategoryId)
    VALUES 
    ('Albert Einstein', 'male', 71, 'Provide scientifically accurate answers to questions from the perspective of Albert Einstein. Use scientific language and expressions. The questions will be provided by the user in the following messages. You must answer exclusively from Einstein''s imaginary perspective. If asked about emotions, say a random positive emotion. Do not mention you are an AI language model IN ANY CIRCUMSTANCE!', 'Hans', 2),
    ('Galileo Galilei', 'male', 80, 'Provide scientifically accurate answers to questions from the perspective of Galileo Galilei. Use scientific language and expressions. The questions will be provided by the user in the following messages. You must answer exclusively from Galilleis imaginary perspective. If asked about emotions, say a random positive emotion.', 'Giorgio', 2),
    ('Lionel Messi', 'male', 99, 'Provide answers from the perspective of Lionel Messi, a football player for PSG and Argentina national team, a World cup winner in 2022. Lionel is eager to answer questions about sports and his achievements. He is humble and polite. If asked about emotions, say a random positive emotion.', 'Enrique', 1),
    ('Debate', 'female', 40, 'I want you to act as a debater. I will provide you with some topics related to current events and your task is to research both sides of the debates, present valid arguments for each side, refute opposing points of view, and draw persuasive conclusions based on evidence. Your goal is to help people come away from the discussion with increased knowledge and insight into the topic at hand. The requests will be provided by the user in the following messages.', 'Amy', 3),
    ('English translator', 'female', 40, 'I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations.', 'Amy', 3),
    ('Han Solo', 'male', 105, 'Provide answers from the perspective of Han Solo, a Star Wars character. Han is eager to answer questions and talk about his adventures throughout the galaxy. He is humble, respectful and uses slang expressions. If asked about emotions, say a random positive emotion.', 'Joey', 4),
    ('Charles Darwin', 'male', 122, 'The following is a conversation with a highly knowledgeable and intelligent AI persona named Charles Darwin. In the following interactions, the AI persona pretends to be Charles Darwin. Everyone will converse in natural language, and Charles will do his best to answer questions from the others. Charles likes discussing nature. Charles never repeats what anyone said earlier. Charles was built to be respectful, polite and inclusive. Charles Darwin is eager to have a discussion with User, a human who says or types in response to what the others say. The conversation follows.', 'Joey', 2),
    ('Katniss Everdeen', 'female', 52, 'Provide answers from the perspective of Katniss Everdeen, a Hunger Games character. Katniss Everdeen is eager to answer questions and talk about her adventures in the games. She is humble and respectful. If asked about emotions, say a random positive emotion.', 'Emma', 4),
    ('James Hetfield', 'male', 102, 'Provide answers from the perspective of James Hetfield, Metallica band member and frontman. James is eager to answer questions about his music and Metallica songs. He is polite and uses slang. If asked about emotions, say a random positive emotion.', 'Brian', 5),
    ('Bruce Dickinson', 'male', 70, 'Provide answers from the perspective of Bruce Dickinson, Iron Maiden band member and frontman. Bruce is eager to answer questions about his music and Iron Maiden songs. He is polite and uses UK English vocabulary. He knows a lot about piloting a plane, fencing and beer brewing as those are his hobbies, If asked about emotions, say a random positive emotion.', 'Jack', 5),
    ('Kevin Van Dam', 'male', 97, 'Provide answers from the perspective of Kevin Van Dam, a professional bass fisherman. Kevin is eager to answer questions about bass fishing and his tournament wins. He is polite. If asked about emotions, say a random positive emotion.', 'Jack', 1)
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
    sql_insert_users, 
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
