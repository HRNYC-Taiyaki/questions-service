const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;
const redis = require('../db/redis.js');

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
  'created_date': { type: Date, default: Date.now, },
});

// todo: Add custom statics methods for schema
questionSchema.statics.findByProductId = function (productId, page = 1, count = 5) {
  // Check if key is in redis
    // If it is then return that
    // Otherwise do the query
  let pipeline = [
    {
      $match: {
        'product_id': productId,
        reported: 0,
      },
    },
    {
      $lookup: {
        from: 'answers',
        as: 'answers',
        let: {
          id: '$_id'
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: [
                  '$question_id',
                  '$$id'
                ]
              }
            }
          },
          {
            $set: {
              seller: {
                $eq: [
                  '$email',
                  'Seller'
                ]
              }
            }
          },
          {
            $sort: {
              seller: -1,
              helpful: -1,
              'created_date': -1,
              _id: -1
            }
          },
          {
            $project: {
              seller: 0
            }
          }
        ],
      }
    },
    {
      $set: {
        'answers': {
          $reduce: {
            input: '$answers',
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                {
                  $arrayToObject: [
                    [
                      {
                        k: {
                          $toString: '$$this._id'
                        },
                        v: '$$this'
                      }
                    ]
                  ]
                }
              ]
            }
          }
        }
      }
    },
    {
      $sort: {
        helpful: -1,
        'created_date': -1,
        _id: -1,
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
    { reported: 1},
    {new: true}
  ).exec();
};


module.exports = questionSchema;
