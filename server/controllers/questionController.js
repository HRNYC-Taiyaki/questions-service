const { Question } = require('../db/mongo.js');
const { validationResult } = require('express-validator');

module.exports = {
  getQuestions: (req, res) => {
    // Responds with error if any of the route validations fail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // let productId = req.query.product_id;
    // let page = req.query.page ? parseInt(req.query.page) : undefined;
    // let count = req.query.count ? parseInt(req.query.count) : undefined;
    Question.findByProductId(req.query.product_id, req.query.page, req.query.count)
    // Question.findByProductId(productId, page, count)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.error(err);
        res.status(422).send(err.message);
      });

  },
  addQuestion: (req, res) => {
    res.status(201).send('Question Added');
  },
  markQuestionHelpful: (req, res) => {
    res.status(204).send();
  },
  reportQuestion: (req, res) => {
    res.status(204).send('Question Added');
  },
};
