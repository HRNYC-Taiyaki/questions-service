const router = require('express').Router();
const answerController = require('../controllers/answerController.js');
const { param } = require('express-validator');

const validateAnswerId = [
  param('answer_id').exists().isLength({min: 24, max: 24})
];

router.put('/:answer_id/helpful', validateAnswerId, answerController.markAnswerHelpful);

router.put('/:answer_id/report', validateAnswerId, answerController.reportAnswer);



module.exports = router;
