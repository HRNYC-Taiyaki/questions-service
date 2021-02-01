const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/qa/questions/:question_id/answers', router.answers);
app.use('/qa/questions', router.questions);
app.use('/qa/answers/:answer_id', router.answers);

module.exports = app;
