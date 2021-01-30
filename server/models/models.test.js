const { afterAll, expect } = require('@jest/globals');
const mongoose = require('mongoose');
const answerSchema = require('./answerModel');
const questionSchema = require('./questionModel');

const dbName = 'sdcTest';

const dummyAnswers = [
  {
    '_id': '60108214fccf1cfd0e4e6da9',
    'id': 10104,
    'question_id': 2872,
    'body': 'Sint deserunt dicta ea in at.',
    'helpful': 3,
    'product_id': 818,
    'photos': [ ],
    'name': 'Vada.Kuhn',
    'email': 'Seller',
    'created_at': '2019-05-21T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da7',
    'id': 10102,
    'question_id': 2872,
    'body': 'Qui voluptas id consequatur necessitatibus id voluptate sit.',
    'helpful': 19,
    'product_id': 818,
    'photos': [ ],
    'name': 'Maximilian_Gerlach44',
    'email': 'Manley64@yahoo.com',
    'created_at': '2019-05-23T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da5',
    'id': 10100,
    'question_id': 2872,
    'body': 'Delectus hic aut et sint.',
    'helpful': 17,
    'product_id': 818,
    'photos': [ ],
    'name': 'Frederick_Boehm87',
    'email': 'Napoleon.Kovacek28@gmail.com',
    'created_at': '2019-03-14T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da6',
    'id': 10101,
    'question_id': 2872,
    'body': 'Aliquid est repellat at hic.',
    'helpful': 17,
    'product_id': 818,
    'photos': [ ],
    'name': 'Litzy_Erdman68',
    'email': 'Dayton97@yahoo.com',
    'created_at': '2019-01-12T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da2',
    'id': 10097,
    'question_id': 2872,
    'body': 'Et et excepturi mollitia nihil sapiente repellat voluptas dolor.',
    'helpful': 14,
    'product_id': 818,
    'photos': [ ],
    'name': 'Antonette72',
    'email': 'Nina_Vandervort@yahoo.com',
    'created_at': '2018-12-30T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da3',
    'id': 10098,
    'question_id': 2872,
    'body': 'Aut odit animi asperiores.',
    'helpful': 13,
    'product_id': 818,
    'photos': [ ],
    'name': 'Larissa_Kling18',
    'email': 'Reyes.Russel@gmail.com',
    'created_at': '2019-02-01T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6da8',
    'id': 10103,
    'question_id': 2872,
    'body': 'Dolorum unde reprehenderit.',
    'helpful': 12,
    'product_id': 818,
    'photos': [ ],
    'name': 'Solon.Dare22',
    'email': 'Mack_Dibbert@hotmail.com',
    'created_at': '2018-11-16T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6dad',
    'id': 10108,
    'question_id': 2872,
    'body': 'Dolorem quos voluptatem quia necessitatibus.',
    'helpful': 0,
    'product_id': 818,
    'photos': [
      {
        '_id': '60108729ffefc9bae1076225',
        'id': 3035,
        'answer_id': 10108,
        'url': 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ],
    'name': 'Cheyanne_Grady',
    'email': 'Kade64@hotmail.com',
    'created_at': '2019-07-06T00:00:00Z',
    'reported': 0
  }
];

const Answer = mongoose.model('Answer', answerSchema);
const Question = mongoose.model('Question', answerSchema);

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
      'photos': [
        {'id': 3035,
          'answer_id': insertId,
          'url': 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
      ],
      'name': 'Lewis_Cronin',
      'email': 'Reid.Lowe@yahoo.com',
      'created_at': '2018-09-30T00:00:00Z',
      'reported': 0
    });
    await answer.save();
    let count = await Answer.estimatedDocumentCount();
    let inserted = await Answer.findOne({id: 198460}).exec();

    expect(count).toBe(9);
    expect(inserted.id).toBe(insertId);
  });

  test('should fetch answers based on page and count', async () => {
    //todo: Could be a more meaningful test - test sort order
    let fetch1 = await Answer.findByQuestionId(2872);
    let fetch2 = await Answer.findByQuestionId(2872, 1, 3);
    let fetch3 = await Answer.findByQuestionId(2872, 3, 3);
    let fetch4 = await Answer.findByQuestionId(2872, 5, 3);
    expect(fetch1.length).toBe(5);
    expect(fetch2.length).toBe(3);
    expect(fetch3.length).toBe(2);
    expect(fetch4.length).toBe(0);
  });

  test('sorting should be by seller then helpful then date', async () => {
    //todo: Could be a more meaningful test - test sort order
    let fetch1 = await Answer.findByQuestionId(2872);
    expect(fetch1[0].email).toBe('Seller');
    expect(fetch1[1].helpful > fetch1[2].helpful).toBe(true);
    expect(fetch1[1].helpful > fetch1[2].helpful).toBe(true);
    expect(fetch1[2].id).toBe(10100);
    expect(fetch1[3].id).toBe(10101);
  });

  test('sorting should be static', async () => {
    //todo: Could be a more meaningful test - test sort order
    let fetch1 = await Answer.findByQuestionId(2872);
    let fetch2 = await Answer.findByQuestionId(2872, 1, 3);
    let fetch3 = await Answer.findByQuestionId(2872, 2, 3);
    expect(fetch2[0].id).toBe(fetch1[0].id);
    expect(fetch3[0].id).toBe(fetch1[3].id);
  });


  test('should increse helpful count by 1', async () => {
    let original = await Answer.findOne({id: 10101}).exec();
    await Answer.markHelpful(10101);
    let updated = await Answer.findOne({id: 10101}).exec();
    expect(original.helpful + 1 === updated.helpful).toBe(true);
  });

  test('should set report flag to true', async () => {
    await Answer.report(10101);
    let updated = await Answer.findOne({id: 10101}).exec();
    expect(updated.reported).toBe(1);
  });

  test('should not return reported answers', async () => {
    await Answer.report(10101);
    let fetch1 = await Answer.findByQuestionId(2872, 1, 10);
    expect(fetch1.length).toBe(7);
  });

});

const dummyQuestions = [];

describe('Question model', () => {
  beforeEach(async () => {
    let bulkWrite = [];
    for (let doc of dummyQuestions) {
      bulkWrite.push(
        {insertOne: {
          document: doc,
        }}
      );
    }

    let res = await Question.bulkWrite(bulkWrite);
  });

  afterEach(async () => {
    // Remove all documents from collection
    await Question.deleteMany();
  });

  test('should add a question', async () => {

  });

  test('should return questions based on page and count', async () => {

  });

  test('should return questions sorted by helpfulness', async () => {

  });

  test('should sorted results should be static', async () => {

  });

  test('should add a question helpful', async () => {

  });

  test('should report a question', async () => {

  });

  test('should not return questions that were reported', async () => {

  });


});
