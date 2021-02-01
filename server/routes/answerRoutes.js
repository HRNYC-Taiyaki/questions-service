const router = require('express').Router();
const answerController = require('../controllers/answerController.js');
const { query, body, param } = require('express-validator');

const validateAnswerId = [
  param('answer_id').exists().isLength({min: 24, max: 24})
];

// router.get('/', [
//   param('question_id').exists().isLength({min: 24, max: 24}),
//   query('page').optional().isNumeric().toInt(),
//   query('count').optional().isNumeric().toInt(),
//   // query('page').if(query('page').exists()).isNumeric().toInt(),
//   // query('count').if(query('count').exists()).isNumeric().toInt(),
// ], answerController.getAnswers);

// router.post('/', [
//   param('question_id').exists().isLength({min: 24, max: 24}),
//   body('body').isLength({min: 3, max: 1000}).trim().escape(),
//   body('name').isLength({min: 1, max: 60}).trim().escape(),
//   body('email').isEmail().normalizeEmail(),
//   body('photos').optional().isArray( { max: 5 })
// ], answerController.addAnswer);

router.put('/:answer_id/helpful', validateAnswerId, answerController.markAnswerHelpful);

router.put('/:answer_id/report', validateAnswerId, answerController.reportAnswer);



module.exports = router;
