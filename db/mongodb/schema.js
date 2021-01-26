db.createCollection("question", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id","product_id", "name", "body"],
      properties: {
        _id: {},
        product_id: {
          bsonType: "int",
          description: "Required. Number to reference associated product"
        },
        created_date: {
          bsonType: "date",
          description: "The date question was submited"
        },
        updated_at: {
          bsonType: "timestamp",
          description: "Time document was last changed"
        },
        body: {
          bsonType: "string",
          description: "Required. User question, max 1000 characters"
        },
        name: {
          bsonType: "string",
          description: "Required. Username that submited question"
        },
        helpfulness: {
          bsonType: "int",
          description: "Counter for how many times users vote question 'helpful'"
        },
        reported: {
          bsonType: "bool",
          description: "Flag if a user has reported the question"
        },
      }
    }
  }
})


db.createCollection("answer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id",],
      properties: {
        _id: {},
        product_id: {
          bsonType: "int",
          description: "Required. Number to reference associated product"
        },
        question_id: {
          bsonType: "int",
          description: "Required. Number to reference associated question"
        },
        created_date: {
          bsonType: "date",
          description: "The date answer was submited"
        },
        updated_at: {
          bsonType: "timestamp",
          description: "Time document was last changed"
        },
        body: {
          bsonType: "string",
          description: "Required"
        },
        name: {
          bsonType: "string",
          description: "Required. Username that submited answer"
        },
        helpfulness: {
          bsonType: "int",
          description: "Counter for how many times users vote answer 'helpful'"
        },
        photos: {
          bsonType: ["array"],
          minItems: 0,
          maxItems: 5,
          items: {
            bsonType: "object",
            required: ["id", "url"],
            properties: {
              id: {
                bsonType: "int",
              },
              url: {
                bsonType: "string",
                description: "url to user image"
              }
            }
          }

        }
      }
    }
  }
})




