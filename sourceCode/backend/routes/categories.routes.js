const express = require('express');
const router = express.Router();
const categories = require('../data/categories')

//returning a list of persona for the user to choose from
router.get("/", (req, res) => {
    try {
        res.json(categories);
    }
    catch (e) {
        res.status(429)
        res.send()
    }
    
});

module.exports = router