const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const persona = ["Albert Einstein", "Contrarian", "Hedonist"]

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/api", (req, res) => {
    res.json(persona);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

