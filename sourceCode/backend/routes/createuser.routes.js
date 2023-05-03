const express = require('express');
const router = express.Router();
const db = require('../db')
var {body, validationResult, check} = require('express-validator');
router.post("/", [
    body("username").trim().notEmpty(),
    body("username").trim().isLength({
        min : 1,
        max : 25
    }),
    body("password").trim().isLength({
        min : 8,
        max : 25
    }),
    body("roleid").trim().notEmpty()
], async (req, res) => {
    let errField = validationResult(req)
    if(!errField.isEmpty()){
        
        res.status(400)
        res.send("Invalid parameters")
    }
    try {
        const sql = `INSERT INTO users (username, password, roleid) VALUES ('${req.body.username}', '${req.body.password}', ${req.body.roleid})`;
        console.log(sql)
        try {
            const result = await db.query(sql, []);
            res.json(result.rows);
        }
        catch (e) {
            res.status(400)
            res.send("An error has occured")
        }
        res.status(200);
        res.send()
    }
    catch (e) {
        res.status(400)
        res.send()
    }
});

module.exports = router