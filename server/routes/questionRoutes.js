const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const { query, body, param } = require('express-validator');

const validateQuestionId = [
  param('question_id').exists().isLength({min: 24, max: 24})
];

router.get('/', [
  query('product_id').exists().isNumeric().toInt(),
  query('page').if(query('page').exists()).isNumeric().toInt(),
  query('count').if(query('count').exists()).isNumeric().toInt(),
],
questionController.getQuestions);

router.post('/', [
  body('product_id').exists().isNumeric().toInt(),
  body('body').isLength({min: 3, max: 1000}).trim().escape(),
  body('name').isLength({min: 1, max: 60}).trim().escape(),
  body('email').isEmail().normalizeEmail(),
],
questionController.addQuestion);

// question_id should exist and convert to string
router.put('/:question_id/helpful', validateQuestionId, questionController.markQuestionHelpful);
router.put('/:question_id/report', validateQuestionId, questionController.reportQuestion);

module.exports = router;
