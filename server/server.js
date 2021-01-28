const express = require('express');
const db = require('./db/mongo.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;
