const mongoose = require('mongoose');
const { Schema } = mongoose;
// const db = require('../db/mongo.js');

const photoSchema = new Schema({
  url: { type: String, required: true },
});

const photoLimit = (photos) => {
  photos.length <= 5;
};

const boolVal = (val) => {
  return val === 0 || val === 1;
};

//todo: Add validation for reported to make sure it is only 1 or 0
const answerSchema = new Schema({
  'id': { type: Number, required: true, unique: true },
  'question_id': { type: Number, required: true },
  'body': { type: String, required: true },
  'helpful': { type: Number, default: 0 },
  'product_id': { type: Number, index: true },
  'photos': {
    type: [photoSchema],
    validate: [photoLimit, 'photos exceeds the limit of 5'],
  },
  'name': { type: String, required: true },
  'email': String,
  'created_at': { type: Date, required: true },
  'reported': { type: Number, default: 0, validate: [boolVal, 'reported can only be 0 or 1']},
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
        reported: 0,
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

answerSchema.statics.markHelpful = function (answerId) {
  return this.findOneAndUpdate(
    {id: answerId},
    {'$inc': {helpful: 1}},
    {new: true}
  )
    .exec();
};

answerSchema.statics.report = function (answerId) {
  return this.findOneAndUpdate(
    {id: answerId},
    {$bit: {
      reported: {'xor': 1}
    }},
    {new: true}
  ).exec();
};

module.exports = answerSchema;
