const express = require('express');
const router = express.Router();
const categories = require('../data/categories')
const db = require('../db')

//returning a list of persona for the user to choose from
router.get("/", async (req, res) => {
    const sql = `SELECT categoryId AS id, categoryName AS name FROM categories`;
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