const { afterAll, expect } = require('@jest/globals');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const answerSchema = require('./answerModel');
const questionSchema = require('./questionModel');

const dbURL = 'mongodb://127.0.0.1/sdcTest';
let aConn, qConn, Answer, Question;

const dummyAnswers = [
  {
    '_id': '60108214fccf1cfd0e4e6da7',
    'question_id': '601087e1d492e8580b3b9035',
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
    'question_id': '601087e1d492e8580b3b9035',
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
    'question_id': '601087e1d492e8580b3b9035',
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
    'question_id': '601087e1d492e8580b3b9035',
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
    'question_id': '601087e1d492e8580b3b9035',
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
    'question_id': '601087e1d492e8580b3b9035',
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
    '_id': '60108214fccf1cfd0e4e6dac',
    'question_id': '601087e1d492e8580b3b9035',
    'body': 'Dicta quia qui est qui sit cumque.',
    'helpful': 11,
    'product_id': 818,
    'photos': [ ],
    'name': 'Sammy32',
    'email': 'Moses_Kunze@yahoo.com',
    'created_at': '2019-06-13T00:00:00Z',
    'reported': 0
  },
  {
    '_id': '60108214fccf1cfd0e4e6dad',
    'question_id': '601087e1d492e8580b3b9035',
    'body': 'Dolorem quos voluptatem quia necessitatibus.',
    'helpful': 0,
    'product_id': 818,
    'photos': [
      {
        '_id': '60108729ffefc9bae1076225',
        'url': 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
      }
    ],
    'name': 'Cheyanne_Grady',
    'email': 'Seller',
    'created_at': '2019-07-06T00:00:00Z',
    'reported': 0
  }
];


beforeAll(async () => {
  aConn = await mongoose.createConnection(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
  qConn = await mongoose.createConnection(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

  Answer = aConn.model('Answer', answerSchema);
  Question = aConn.model('Question', questionSchema);
});

afterAll(async () => {
  await aConn.dropDatabase();
  await aConn.close();

  await qConn.dropDatabase();
  await qConn.close();
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
    let answer = new Answer ({
      'question_id': '601087e1d492e8580b3b8519',
      'body': 'Test answer',
      'photos': [
        { 'url': 'https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
      ],
      'name': 'Test1234',
      'email': 'test.answer@test.this',
    });

    await answer.save();
    let count = await Answer.estimatedDocumentCount();
    let result = await Answer.findOne({name: 'Test1234'}).exec();

    expect(count).toBe(9);
    expect(result._id.toString().length).toBe(24);
    expect(result.helpful).toBe(0);
    expect(result.reported).toBe(0);
    expect(result.photos.length).toBe(1);
    expect(result.question_id.toString()).toBe('601087e1d492e8580b3b8519');
    expect(result.created_at instanceof Date).toBe(true);
  });

  test('should fetch answers based on page and count', async () => {
    let fetch1 = await Answer.findByQuestionId('601087e1d492e8580b3b9035');
    let fetch2 = await Answer.findByQuestionId('601087e1d492e8580b3b9035', 1, 3);
    let fetch3 = await Answer.findByQuestionId('601087e1d492e8580b3b9035', 3, 3);
    let fetch4 = await Answer.findByQuestionId('601087e1d492e8580b3b9035', 5, 3);
    expect(fetch1.length).toBe(5);
    expect(fetch2.length).toBe(3);
    expect(fetch3.length).toBe(2);
    expect(fetch4.length).toBe(0);
  });

  test('sorting should be by seller then helpful then date', async () => {
    let results = await Answer.findByQuestionId('601087e1d492e8580b3b9035');
    expect(results[0].email).toBe('Seller');
    expect(results[1].helpful > results[2].helpful).toBe(true);
    expect(results[2].created_at > results[3].created_at).toBe(true);
  });

  test('sorting should be static', async () => {
    let questionId = '601087e1d492e8580b3b9035';
    let fetch1 = await Answer.findByQuestionId(questionId);
    let fetch2 = await Answer.findByQuestionId(questionId, 1, 3);
    let fetch3 = await Answer.findByQuestionId(questionId, 2, 3);
    debugger;
    expect(fetch2[0]._id.toString()).toBe(fetch1[0]._id.toString());
    expect(fetch3[0]._id.toString()).toBe(fetch1[3]._id.toString());
  });


  test('should increse helpful count by 1', async () => {
    let answerId = '60108214fccf1cfd0e4e6da3';
    let original = await Answer.findOne({_id: ObjectId(answerId)}).exec();
    await Answer.markHelpful(answerId);
    let updated = await Answer.findOne({_id: ObjectId(answerId)}).exec();
    expect(original.helpful + 1 === updated.helpful).toBe(true);
  });

  test('should set report flag to true', async () => {
    let answerId = '60108214fccf1cfd0e4e6da3';
    await Answer.report(answerId);
    let updated = await Answer.findOne({_id: ObjectId(answerId)}).exec();
    expect(updated.reported).toBe(1);
  });

  test('should not return reported answers', async () => {
    let answerId = '60108214fccf1cfd0e4e6da3';
    await Answer.report(answerId);
    let fetch1 = await Answer.findByQuestionId('601087e1d492e8580b3b9035', 1, 10);
    expect(fetch1.length).toBe(7);
  });

});

const dummyQuestions = [
  {
    '_id': '601087e2d492e8580b3c618e',
    'id': 56462,
    'product_id': 16087,
    'body': 'Aliquid et repellendus accusamus labore dignissimos.',
    'helpful': 5,
    'reported': 0,
    'name': 'Annetta.Buckridge',
    'email': 'Georgiana.Yost@hotmail.com',
    'created_at': '2018-09-16T00:00:00Z',
  },
  {
    '_id': '601087e2d492e8580b3c618f',
    'id': 56463,
    'product_id': 16087,
    'body': 'Et et rerum omnis impedit ipsam perferendis facere sed commodi.',
    'helpful': 17,
    'reported': 1,
    'name': 'Jaydon.Keebler',
    'email': 'Raleigh_McClure@gmail.com',
    'created_at': '2019-04-29T00:00:00Z',
  },
  {
    '_id': '601087e2d492e8580b3c6190',
    'id': 56464,
    'product_id': 16087,
    'body': 'Numquam ducimus enim cumque voluptas officiis rerum repudiandae recusandae doloremque.',
    'helpful': 23,
    'reported': 0,
    'name': 'Kennith.Medhurst',
    'email': 'Eldred.Hills@hotmail.com',
    'created_at': '2019-07-19T00:00:00Z',
  }
];

describe('Question model', () => {
  beforeEach(async () => {
    let bulkWrite = [];
    for (let doc of dummyAnswers) {
      bulkWrite.push(
        {insertOne: {
          document: doc,
        }}
      );
    }

    let bulkWriteQuestions = [];
    for (let doc of dummyQuestions) {
      bulkWriteQuestions.push(
        {insertOne: {
          document: doc,
        }}
      );
    }

    await Answer.bulkWrite(bulkWrite);
    await Question.bulkWrite(bulkWriteQuestions);
  });

  afterEach(async () => {
    // Remove all documents from collection
    await Question.deleteMany();
    await Answer.deleteMany();
  });

  test('should add a question', async () => {
    let question = {
      'product_id': 16087,
      'body': 'Numquam ducimus enim cumque voluptas officiis rerum repudiandae recusandae doloremque.',
      'name': 'Kennith.Medhurst',
      'email': 'Eldred.Hills@hotmail.com',
    };
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
