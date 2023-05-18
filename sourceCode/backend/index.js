var bodyParser = require('body-parser')
const axios = require("axios")
const express = require("express");
var multer = require('multer');
var upload = multer();
var cors = require('cors')

const app = express();


const personaRouter = require('./routes/persona.routes')
const voiceRouter = require('./routes/voice.routes')
const chatRouter = require('./routes/chat.routes')
const categoriesRouter = require('./routes/categories.routes')
const createRouter = require('./routes/create.routes')
const loginRouter = require('./routes/login.routes')
const rolesRouter = require('./routes/roles.routes')
const createuserRouter = require('./routes/createuser.routes')
const editRouter = require('./routes/edit.routes')
const logsRouter = require('./routes/logs.routes')

app.options('/', cors)
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(upload.array()); 

app.use(express.static('public'));

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
app.use('/login', loginRouter);
app.use('/roles', rolesRouter)
app.use('/createuser', createuserRouter)
app.use('/edit', editRouter)
app.use('/log', logsRouter)
const PORT = 5300;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

