const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
//todo: import controllers


router.get('/', questionController.getProductQuestions);


module.exports = router;
