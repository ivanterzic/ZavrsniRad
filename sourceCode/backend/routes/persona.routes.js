const express = require('express');
const router = express.Router();
const db = require('../db')

//returning a list of persona for the user to choose from
router.get("/", async (req, res) => {
    const sql = `SELECT personaId AS id, personaName AS name, personaGender AS gender, personaImageId AS imageid, personaInitialPrompt AS initialPrompt, personaVoice AS voice, personaCategoryId AS category, creatorUserName, originalPersona
    FROM persona`;
    try {
        const result = await db.query(sql, []);
        res.json(result.rows);
    }
    catch (e) {
        console.log(e)
        res.status(400)
        res.send()
    }
});

module.exports = router