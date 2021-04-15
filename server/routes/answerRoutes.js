const router = require('express').Router();
const answerController = require('../controllers/answerController.js');
const { param } = require('express-validator');
const validate = require('../middleware/validate.js');

const validateAnswerId = [
  param('answer_id').exists().isLength({ min: 24, max: 24 }),
];

router.put(
  '/:answer_id/helpful',
  validateAnswerId,
  validate,
  answerController.markAnswerHelpful
);

router.put(
  '/:answer_id/report',
  validateAnswerId,
  validate,
  answerController.reportAnswer
);

module.exports = router;
