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
  'created_date': { type: Date, default: Date.now, },
});

// todo: Add custom statics methods for schema
questionSchema.statics.findByProductId = function (productId, page = 1, count = 5) {
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
              },
              id: '$_id',
              date: '$created_date',
              answerer_name: '$name',
              helpfulness: '$helpful',
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
              _id: 0,
              id: 1,
              body: 1,
              date: 1,
              answerer_name: 1,
              helpfulness: 1,
              photos: 1,
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
                          $toString: '$$this.id'
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
    {
      $set: {
        'question_id': '$_id',
        'question_body': '$body',
        'question_date': '$created_date',
        'asker_name': '$name',
        'question_helpfulness': '$helpful'
      }
    },
    {
      $project: {
        _id: 0,
        body: 0,
        created_date: 0,
        name: 0,
        helpful: 0,
        product_id: 0,
        email: 0,
      }
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
