var bodyParser = require('body-parser')
const axios = require("axios")
const express = require("express");
var multer = require('multer');
var upload = multer();
var cors = require('cors')

const app = express();
const PORT = 3001;

const personaRouter = require('./routes/persona.routes')
const voiceRouter = require('./routes/voice.routes')
const chatRouter = require('./routes/chat.routes')
const categoriesRouter = require('./routes/categories.routes')
const createRouter = require('./routes/create.routes')

app.options('/', cors)
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(upload.array()); 
app.use(express.static('public'));

//solution to fix invalid requests from the frontend (request header parameter error)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', "*");
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', "GET, PUT, OPTIONS, POST");
  next();
});
app.use('/personadata', personaRouter);
app.use('/getvoice', voiceRouter);
app.use('/chatcompletion', chatRouter);
app.use('/categories', categoriesRouter);
app.use('/create', createRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

