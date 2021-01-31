const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const photoSchema = new Schema({
  url: { type: String, required: true },
});

const photoLimit = (photos) => {
  photos.length <= 5;
};

const boolVal = (val) => {
  return val === 0 || val === 1;
};

const answerSchema = new Schema({
  'question_id': { type: mongoose.ObjectId, required: true, index: true },
  'body': { type: String, required: true },
  'helpful': { type: Number, default: 0 },
  'product_id': { type: Number, index: true },
  'photos': {
    type: [photoSchema],
    validate: [photoLimit, 'photos exceeds the limit of 5'],
  },
  'name': { type: String, required: true },
  'email': { type: String, required: true },
  'created_at': { type: Date, default: Date.now, },
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
        'question_id': ObjectId(questionId),
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
    {_id: ObjectId(answerId)},
    {'$inc': {helpful: 1}},
    {new: true}
  )
    .exec();
};

answerSchema.statics.report = function (answerId) {
  return this.findOneAndUpdate(
    {_id: ObjectId(answerId)},
    {$bit: {
      reported: {'xor': 1}
    }},
    {new: true}
  ).exec();
};

module.exports = answerSchema;
