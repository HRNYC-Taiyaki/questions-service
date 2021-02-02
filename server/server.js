const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/qa/questions', router.questions);
app.use('/qa/answers', router.answers);

module.exports = app;
