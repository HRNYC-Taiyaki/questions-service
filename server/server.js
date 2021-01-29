const express = require('express');
const router = require('./routes');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/qa/questions', router.questions);


module.exports = app;
