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
        const sql = `
            UPDATE persona 
            SET personaname = '${req.body.personaname}',
                personagender = '${req.body.personagender}', 
                personaimageid = ${req.body.personaimageid}, 
                personainitialprompt = '${req.body.personainitialprompt}', 
                personavoice = '${req.body.personavoice}', 
                personacategoryid = ${req.body.personacategoryid}, 
                creatorusername = '${req.body.creatorusername}', 
                originalpersona = ${req.body.originalpersona}
            WHERE personaid = ${req.body.id}`
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

router.post("/delete", async (req, res) => {
    let errField = validationResult(req)
    if(!errField.isEmpty()){
        res.status(400)
        res.send("Invalid parameters")
    }
    try {
        const sql = `DELETE FROM persona WHERE personaid = ${req.body.id}`;
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