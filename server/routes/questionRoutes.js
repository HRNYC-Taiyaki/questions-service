const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const answerController = require('../controllers/answerController.js');
const { query, body, param } = require('express-validator');
const validate = require('../middleware/validate.js');

const validateQuestionId = [
  param('question_id').exists().isLength({ min: 24, max: 24 }),
];

router.get(
  '/',
  [
    query('product_id').exists().isNumeric().toInt(),
    query('page').if(query('page').exists()).isNumeric().toInt(),
    query('count').if(query('count').exists()).isNumeric().toInt(),
    validate,
  ],
  questionController.getQuestions
);

router.post(
  '/',
  [
    body('product_id').exists().isNumeric().toInt(),
    body('body').isLength({ min: 3, max: 1000 }).trim().escape(),
    body('name').isLength({ min: 1, max: 60 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    validate,
  ],
  questionController.addQuestion
);

router.put(
  '/:question_id/helpful',
  [validateQuestionId, validate],
  questionController.markQuestionHelpful
);
router.put(
  '/:question_id/report',
  [validateQuestionId, validate],
  questionController.reportQuestion
);

// ************************
// ** Get/Post Answers
// ************************

router.get(
  '/:question_id/answers',
  [
    param('question_id').exists().isLength({ min: 24, max: 24 }),
    query('page').optional().isNumeric().toInt(),
    query('count').optional().isNumeric().toInt(),
    validate,
  ],
  answerController.getAnswers
);

router.post(
  '/:question_id/answers',
  [
    param('question_id').exists().isLength({ min: 24, max: 24 }),
    body('body').isLength({ min: 3, max: 1000 }).trim().escape(),
    body('name').isLength({ min: 1, max: 60 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('photos').optional().isArray({ max: 5 }),
    validate,
  ],
  answerController.addAnswer
);

module.exports = router;
