const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../db/mongo.js');

const photoSchema = new Schema({
  'url': {type: String, required: true},
});

const photoLimit = (photos) => { photos.length <= 5; };

const answerSchema = new Schema({
  'id': {type: Number, required: true, unique: true},
  'question_id': {type: Number, required: true},
  'body': {type: String, required: true},
  'helpful': {type: Number, default: 0},
  'product_id': {type: Number, index: true},
  'photos': {type: [photoSchema], validate: [photoLimit, 'photos exceeds the limit of 5']},
  'name': {type: String, required: true},
  'email': String,
  'created_at': {type: Date, required: true},
  'reported': {type: Boolean, default: false},
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
  find: (questionId, page, count) => {},
  addNew: (answer) => {},
  markHelpful: (answerId) => {},
  report: (answerId) => {},
};
