const router = require('express').Router();
const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAnswers);
router.post('/', answerController.addAnswer);
router.put('/helpful', answerController.markAnswerHelpful);
router.put('/report', answerController.reportAnswer);


module.exports = router;
