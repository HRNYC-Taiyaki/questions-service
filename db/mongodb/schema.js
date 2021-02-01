db.createCollection('question', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'product_id',
        'name',
        'body',
        'created_date',
        'helpful',
        'reported',
      ],
      properties: {
        'product_id': {
          bsonType: 'int',
          description: 'Required. Number to reference associated product'
        },
        'created_date': {
          bsonType: 'date',
          description: 'The date question was submited'
        },
        body: {
          bsonType: 'string',
          description: 'Required. User question, max 1000 characters'
        },
        name: {
          bsonType: 'string',
          description: 'Required. Username that submited question'
        },
        email: {
          bsonType: 'string',
          description: 'Email of user that submited question'
        },
        helpful: {
          bsonType: 'int',
          description: 'Counter for how many times users vote question \'helpful\''
        },
        reported: {
          bsonType: 'int',
          description: 'Flag if a user has reported the question'
        }
      }
    }
  }
});


db.createCollection('answer', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'product_id',
        'question_id',
        'body',
        'name',
        'helpful',
        'reported',
        'created_date'
      ],
      properties: {
        'product_id': {
          bsonType: 'int',
          description: 'Required. Number to reference associated product'
        },
        'question_id': {
          bsonType: 'objectId',
          description: 'Required. ID to reference associated question'
        },
        'created_date': {
          bsonType: 'date',
          description: 'The date answer was submited'
        },
        body: {
          bsonType: 'string',
          description: 'Required'
        },
        name: {
          bsonType: 'string',
          description: 'Required. Username that submited answer'
        },
        email: {
          bsonType: 'string',
          description: 'Email that submited answer'
        },
        helpful: {
          bsonType: 'int',
          description: 'Counter for how many times users vote answer \'helpful\''
        },
        reported: {
          bsonType: 'int',
          description: 'Flag if a user has reported the answer'
        },
        photos: {
          bsonType: [
            'array'
          ],
          minItems: 0,
          maxItems: 5,
          items: {
            bsonType: 'object',
            required: [
              'url'
            ],
            properties: {
              url: {
                bsonType: 'string',
                description: 'url to user image'
              }
            }
          }
        }
      }
    }
  }
});




