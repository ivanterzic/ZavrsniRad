const express = require('express');
const router = express.Router();
const persona = require('../data/db')

//returning a list of persona for the user to choose from
router.get("/", (req, res) => {
    res.json(persona);
});

module.exports = router