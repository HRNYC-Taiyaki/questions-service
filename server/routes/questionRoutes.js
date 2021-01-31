const router = require('express').Router();
const questionController = require('../controllers/questionController.js');

router.get('/', questionController.getQuestions);
router.post('/', questionController.addQuestion);
router.put('/:question_id/helpful', questionController.markQuestionHelpful);
router.put('/:question_id/report', questionController.reportQuestion);

module.exports = router;
