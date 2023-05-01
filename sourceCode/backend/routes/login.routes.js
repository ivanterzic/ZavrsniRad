const express = require('express');
const router = express.Router();
const db = require('../db')

async function checkUsername(username){
    try {
        let sql = `SELECT password, roleId FROM users WHERE username = '${username}'`
        const result = await db.query(sql, []);
        return result
    }
    catch (e) {
        res.status(201)
        res.send("Database error!");
    }
}

router.post('/', async function (req, res) {
    console.log(req.body)
    let result = await checkUsername(req.body.username);
    console.log(result)
    if (result.rows.length === 1){
        if (result.rows[0].password === req.body.password){
            res.status(200)
            res.send({"level" : result.rows[0].roleid})
        }
        else {
            console.log("ne moze")
            res.status(201)
            res.send("Username or password incorrect!");
        }
    }
    else {
        res.status(201)
        res.send("Username or password incorrect!");
    }
    
    
});

module.exports = router