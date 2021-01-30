const { afterAll, expect } = require('@jest/globals');
const mongoose = require('mongoose');
const answerSchema = require('./answerModel');

const dbName = 'sdcTest';

const dummyAnswers = [
  {
    'id': 198454,
    'question_id': 56464,
    'body': 'Voluptatem modi veniam in ex.',
    'helpful': 6,
    'product_id': 16087,
    'photos': [
      {
        'url': 'https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ],
    'name': 'Georgette.Glover7',
    'email': 'Cortez_Huel@hotmail.com',
    'created_at': '2019-02-07T00:00:00Z',
    'reported': false
  },
  {
    'id': 198455,
    'question_id': 56464,
    'body': 'Laborum voluptas vitae non quod voluptatem necessitatibus et et maxime.',
    'helpful': 0,
    'product_id': 16087,
    'photos': [ ],
    'name': 'Lewis_Cronin',
    'email': 'Reid.Lowe@yahoo.com',
    'created_at': '2018-09-30T00:00:00Z',
    'reported': false
  },
  {
    '_id': '60108218fccf1cfd0e514d68',
    'id': 198456,
    'question_id': 56464,
    'body': 'Officia nobis occaecati placeat eveniet inventore quibusdam aliquid est neque.',
    'helpful': 3,
    'product_id': 16087,
    'photos': [ ],
    'name': 'Rick.Runte',
    'email': 'Lyla.Harber@gmail.com',
    'created_at': '2018-12-28T00:00:00Z',
    'reported': false
  }
];

const Answer = mongoose.model('Answer', answerSchema);

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${dbName}`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Answer model', () => {

  beforeEach(async () => {
    let bulkWrite = [];
    for (let doc of dummyAnswers) {
      bulkWrite.push(
        {insertOne: {
          document: doc,
        }}
      );
    }

    let res = await Answer.bulkWrite(bulkWrite);
  });

  afterEach(async () => {
    // Remove all documents from collection
    await Answer.deleteMany();
  });

  test('should add new answers', async () => {
    let insertId = 198460;
    let answer = new Answer ({
      'id': insertId,
      'question_id': 56464,
      'body': 'Test answer',
      'helpful': 0,
      'product_id': 16087,
      'photos': [ ],
      'name': 'Lewis_Cronin',
      'email': 'Reid.Lowe@yahoo.com',
      'created_at': '2018-09-30T00:00:00Z',
      'reported': false
    });
    await answer.save();
    let count = await Answer.estimatedDocumentCount();
    let inserted = await Answer.findOne({id: 198460}).exec();

    expect(count).toBe(4);
    expect(inserted.id).toBe(insertId);
  });

  test('should fetch answers', async () => {
    //todo: Could be a more meaningful test - test sort order
    let fetch1 = await Answer.findByQuestionId(56464);
    let fetch2 = await Answer.findByQuestionId(56464, 1, 2);
    let fetch3 = await Answer.findByQuestionId(56464, 2, 2);
    expect(fetch1.length).toBe(3);
    expect(fetch2.length).toBe(2);
    expect(fetch3.length).toBe(1);
    expect(fetch2[0].id).toBe(fetch1[0].id);
    expect(fetch3[0].id).toBe(fetch1[2].id);
  });


  test('should increse helpful count by 1', async () => {
    await Answer.markHelpful(198454);
    let updated = await Answer.findOne({id: 198454}).exec();
    expect(updated.helpful).toBe(7);
  });

  test('should set report flag to true', async () => {
    await Answer.report(198454);
    let updated = await Answer.findOne({id: 198454}).exec();
    expect(updated.report).toBe(true);
  });

});

