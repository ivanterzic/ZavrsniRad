const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const persona = [{ 
  name :"Albert Einstein", 
  initialPrompt : ""
}, {
  name: "Contrarian",
  initialPrompt : ""
}, {
  name : "Hedonist", 
  initialPrompt : ""
}] //TODO: prebaciti podatke u bazu kad se odredi sto sve ide u bazu

//solution to fix invalid requests from the frontend (request header parameter error)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//returning a list of persona for the user to choose from
app.get("/api", (req, res) => {
    res.json(persona);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

