const { Answer } = require('../db/mongo.js');
const { validationResult } = require('express-validator');

module.exports = {
  getAnswers: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    debugger;
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.status(200).send('Question Answers');
  },
  addAnswer: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    debugger;
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.status(201).send('Answer Added');
  },
  markAnswerHelpful: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Answer.markHelpful(req.params.answer_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch( err => {
        res.sendStatus(500);
      });


  },
  reportAnswer: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Answer.report(req.params.answer_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch( err => {
        res.sendStatus(500);
      });

  },
};
