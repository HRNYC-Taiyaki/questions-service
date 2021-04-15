const { Question } = require('../db/mongo.js');

module.exports = {
  getQuestions: (req, res) => {
    let { product_id, page, count } = req.query;

    Question.findByProductId(product_id, page, count)
      .then((results) => {
        let resBody = {
          product_id,
          results,
        };
        res.status(200).json(resBody);
      })
      .catch((err) => {
        console.error(err);
        res.status(422).send(err.message);
      });
  },
  addQuestion: (req, res) => {
    // Build the question object
    let { body, name, email, product_id } = req.body;
    // Save question object
    let question = new Question({ body, name, email, product_id });
    question
      .save()
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },
  markQuestionHelpful: (req, res) => {
    Question.markHelpful(req.params.question_id)
      .then((results) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },
  reportQuestion: (req, res) => {
    Question.report(req.params.question_id)
      .then((results) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },
};
