const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/qa/questions', router.questions);
app.use('/qa/answers', router.answers);

module.exports = app;
