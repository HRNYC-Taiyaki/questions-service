const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

const passParams = function (req, res, next) {
  debugger;
  req.param = req.params;
  next();
};

app.use('/qa/questions/:question_id/answers', /* passParams, */ router.answers);
app.use('/qa/questions', router.questions);
app.use('/qa/answers', router.answers);

module.exports = app;
