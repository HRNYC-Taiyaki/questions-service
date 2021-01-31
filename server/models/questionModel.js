const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const boolVal = (val) => {
  return val === 0 || val === 1;
};

const questionSchema = new Schema({
  'product_id': {type: Number, required: true, index: true},
  'body': {type: String, required: true},
  'helpful': { type: Number, default: 0 },
  'reported': { type: Number, default: 0, validate: [boolVal, 'reported can only be 0 or 1']},
  'name': {type: String, required: true},
  'email': { type: String, required: true },
  'created_at': { type: Date, default: Date.now, },
});

// todo: Add custom statics methods for schema
questionSchema.statics.findByProductId = function (productId, page = 1, count = 5) {

};

questionSchema.statics.markHelpful = function (questionId) {
  return this.findOneAndUpdate(
    {_id: ObjectId(questionId)},
    {'$inc': {helpful: 1}},
    {new: true}
  )
    .exec();
};

questionSchema.statics.report = function (questionId) {
  return this.findOneAndUpdate(
    {_id: ObjectId(questionId)},
    {$bit: {
      reported: {'xor': 1}
    }},
    {new: true}
  ).exec();
};


module.exports = questionSchema;
