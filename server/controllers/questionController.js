const { Question } = require('../db/mongo.js');

module.exports = {
  getQuestions: (req, res) => {
    let productId = req.query.product_id;
    if (!productId) {
      res.status(422).send('Error: invalid product_id provided');
    } else {
      // todo: Would like to convert these to numbers using middleware
      productId = parseInt(productId);
      let page = req.query.page ? parseInt(req.query.page) : undefined;
      let count = req.query.count ? parseInt(req.query.count) : undefined;
      Question.findByProductId(productId, page, count)
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          console.error(err);
          res.sendStatus(500);
        });
    }

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
