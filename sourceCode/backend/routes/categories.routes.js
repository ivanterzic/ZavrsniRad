const express = require('express');
const router = express.Router();
const categories = require('../data/categories')

//returning a list of persona for the user to choose from
router.get("/", (req, res) => {
    res.json(categories);
});

module.exports = router