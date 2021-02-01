const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const { query } = require('express-validator');

router.get('/', [
  query('product_id').exists().isNumeric().toInt(),
  query('page').if(query('page').exists()).isNumeric().toInt(),
  query('count').if(query('count').exists()).isNumeric().toInt(),
],
questionController.getQuestions);

// body should exist
// name should exist
// standardize e-mail
// product_id should exist convert to number
router.post('/', questionController.addQuestion);

// question_id should exist and convert to string
router.put('/:question_id/helpful', questionController.markQuestionHelpful);
router.put('/:question_id/report', questionController.reportQuestion);

module.exports = router;
