const express = require('express');
const router = express.Router();
const db = require('../db')

router.get("/", async (req, res) => {
    const sql = `SELECT * FROM roles`;
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