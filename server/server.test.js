const app = require('./server.js');
const request = require('supertest')(app);

const product_id = 2;
const question_id = '601949a78f1fa4f66235bdef';

describe('Server', () => {
  it('should have route to get questions', async () => {
    let response = await request.get(`/qa/questions?product_id=${product_id}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    for (question of response.body) {
      expect(question).toHaveProperty('product_id', product_id);
    }
  });

  it('should have route to get answers', async () => {
    let response = await request.get(`/qa/questions/${question_id}/answers`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    for (answer of response.body) {
      expect(answer).toHaveProperty('question_id', question_id);
    }

  });

  it('should have route to post questions', async (done) => {
    let response = await request.post('/qa/questions');
    expect(response.status).toBe(201);
    done();
  });

  it('should have route to post answers', async (done) => {
    let response = await request.post('/qa/questions/56462/answers');
    expect(response.status).toBe(201);
    done();
  });

  it('should have route to mark question helpful', async (done) => {
    let response = await request.put('/qa/questions/56462/helpful');
    expect(response.status).toBe(204);
    done();
  });

  it('should have route to report question', async (done) => {
    let response = await request.put('/qa/questions/56462/report');
    expect(response.status).toBe(204);
    done();
  });

  it('should have route to mark answer helpful', async (done) => {
    let response = await request.put('/qa/answers/537545/helpful');
    expect(response.status).toBe(204);
    done();
  });

  it('should have route to report answer', async (done) => {
    let response = await request.put('/qa/answers/537545/report');
    expect(response.status).toBe(204);
    done();
  });
});