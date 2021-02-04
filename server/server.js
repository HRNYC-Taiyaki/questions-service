const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// For stress testing with loader.io
app.get('/loaderio-a4c54f82626e216f9d99d73ad6d702e0/', (req, res) => {
  res.sendFile(path.join(__dirname, './loaderio-a4c54f82626e216f9d99d73ad6d702e0.txt'));
});

app.use('/qa/questions', router.questions);
app.use('/qa/answers', router.answers);

module.exports = app;
