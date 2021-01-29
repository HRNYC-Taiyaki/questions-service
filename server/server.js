const express = require('express');
const router = require('./routes');
const db = require('./db/mongo.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/qa/questions', router.questions);


module.exports = app;
