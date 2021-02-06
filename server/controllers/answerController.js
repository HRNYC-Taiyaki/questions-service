const { Answer, Question } = require('../db/mongo.js');
const { validationResult } = require('express-validator');

module.exports = {
  getAnswers: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let {question_id, page = 1, count = 5} = req.params;

    Answer.findByQuestionId(question_id, page, count)
      .then(results => {
        // Reformat results
        let resBody = {
          question: question_id,
          page: page - 1,
          count,
          results
        };

        res.status(200).json(resBody);
      })
      .catch(err => {
        console.error(err);
        res.status(422).send(err.message);
      });

  },
  addAnswer: async (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Build the answer object
    let { question_id } = req.params;
    let {body, name, email, photos } = req.body;

    // todo: Can we get the product_id from question in to answer with one query?
    let question = await Question.findById(question_id);
    let { product_id } = question;

    // Save answer
    let answer = new Answer(
      { body, name, email, question_id, photos, product_id}
    );
    answer.save()
      .then(result => {
        res.sendStatus(201);
      })
      .catch( err => {
        res.sendStatus(500);
      });

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
