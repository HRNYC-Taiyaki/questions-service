const { Question } = require('../db/mongo.js');
const { validationResult } = require('express-validator');

module.exports = {
  getQuestions: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Question.findByProductId(req.query.product_id, req.query.page, req.query.count)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.error(err);
        res.status(422).send(err.message);
      });

  },
  addQuestion: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    res.status(201).send('Question Added');
  },
  markQuestionHelpful: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    res.status(204).send();
  },
  reportQuestion: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    res.status(204).send('Question Added');
  },
};
