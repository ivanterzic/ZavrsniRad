const express = require('express');
const router = express.Router();
const db = require('../db')
var {body, validationResult, check} = require('express-validator');

router.post("/", [
    body("personaname").trim().notEmpty(),
    body("personaname").trim().isLength({
        min : 1,
        max : 50
    }),
    body("personagender").trim().notEmpty(),
    body("personaimageid").trim().notEmpty(),
    body("personainitialprompt").trim().notEmpty().isLength({
        min : 1,
        max : 1000
    }),
    body("personavoice").trim().notEmpty(),
    body("personacategoryid").trim().notEmpty(),
    body("creatorusername").trim().notEmpty().isLength({
        min : 1,
        max : 25
    }),
], async (req, res) => {
    let errField = validationResult(req)
    if(!errField.isEmpty()){
        res.status(400)
        res.send("Invalid parameters")
    }
    try {
        const sql = `INSERT INTO persona (personaname, personagender, personaimageid, personainitialprompt, personavoice, personacategoryid, creatorusername) VALUES ('${req.body.personaname}', '${req.body.personagender}', ${req.body.personaimageid}, '${req.body.personainitialprompt}', '${req.body.personavoice}', ${req.body.personacategoryid}, '${req.body.creatorusername}')`;
        console.log(sql)
        try {
            const result = await db.query(sql, []);
            console.log(result)
            res.json(result.rows);
        }
        catch (e) {
            res.status(400)
            res.send(e)
        }
        res.status(200);
        res.send(result.rows)
    }
    catch (e) {
        res.status(400)
        res.send()
    }
});

router.post("/modified", [
    body("personaname").trim().notEmpty(),
    body("personaname").trim().isLength({
        min : 1,
        max : 50
    }),
    body("personagender").trim().notEmpty(),
    body("personaimageid").trim().notEmpty(),
    body("personainitialprompt").trim().notEmpty().isLength({
        min : 1,
        max : 1000
    }),
    body("personavoice").trim().notEmpty(),
    body("creatorusername").trim().notEmpty().isLength({
        min : 1,
        max : 25
    }),
    body("originalpersona").trim().notEmpty(),
], async (req, res) => {
    let errField = validationResult(req)
    if(!errField.isEmpty()){
        res.status(400)
        res.send("Invalid parameters")
    }
    try {
        const sql = `INSERT INTO persona (personaname, personagender, personaimageid, personainitialprompt, personavoice, personacategoryid, creatorusername, originalpersona) VALUES ('${req.body.personaname}', '${req.body.personagender}', ${req.body.personaimageid}, '${req.body.personainitialprompt}', '${req.body.personavoice}', 6, '${req.body.creatorusername}', ${req.body.originalpersona})`;
        console.log(sql)
        try {
            const result = await db.query(sql, []);
            console.log(result)
            res.json(result.rows);
        }
        catch (e) {
            console.log(e)
            res.status(400)
            res.send(e)
        }
        res.status(200);
        res.send(result.rows)
    }
    catch (e) {
        
        res.status(400)
        res.send()
    }
});

module.exports = router