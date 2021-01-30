const mongoose = require('mongoose');
const { Schema } = mongoose;
// const db = require('../db/mongo.js');

const photoSchema = new Schema({
  url: { type: String, required: true },
});

const photoLimit = (photos) => {
  photos.length <= 5;
};

const answerSchema = new Schema({
  'id': { type: Number, required: true, unique: true },
  'question_id': { type: Number, required: true },
  'body': { type: String, required: true },
  'helpful': { type: Number, default: 0 },
  'product_id': { type: Number, index: true },
  'photos': {
    'type': [photoSchema],
    'validate': [photoLimit, 'photos exceeds the limit of 5'],
  },
  'name': { type: String, required: true },
  'email': String,
  'created_at': { type: Date, required: true },
  'reported': { type: Boolean, default: false },
});

// Return a promise that resolves to an array
answerSchema.statics.findByQuestionId = function (
  questionId,
  page = 1,
  count = 5
) {
  let pipeline = [
    {
      $match: {
        'question_id': questionId,
      },
    },
    {
      $set: {
        seller: {
          $eq: ['$email', 'Seller'],
        },
      },
    },
    {
      $sort: {
        seller: -1,
        helpful: -1,
        'created_at': -1,
      },
    },
    {
      $project: {
        seller: 0,
      },
    },
    {
      $skip: (page - 1) * count,
    },
    {
      $limit: count,
    },
  ];
  return this.aggregate(pipeline);
};

answerSchema.statics.addNew = function (answer) {};

answerSchema.statics.markHelpful = function (answerId) {};

answerSchema.statics.report = function (answerId) {};

module.exports = answerSchema;
