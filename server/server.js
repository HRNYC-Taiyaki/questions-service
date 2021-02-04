const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// ************************
// ** For Stress Testing
// ************************
const { Answer, Question } = require('./db/mongo.js');

// Delete all questions related to test product 9999999
app.delete('/qa/questions', (req, res) => {
  Question.deleteMany({ product_id: 9999999 })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Delete all answers related to test question '601949a78f1fa4f66235bdf4'
app.delete('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  Answer.deleteMany({ question_id })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// Returns authentication file for loader.io
app.get('/loaderio-a4c54f82626e216f9d99d73ad6d702e0/', (req, res) => {
  res.sendFile(
    path.join(__dirname, './loaderio-a4c54f82626e216f9d99d73ad6d702e0.txt')
  );
});

app.use('/qa/questions', router.questions);
app.use('/qa/answers', router.answers);

module.exports = app;
