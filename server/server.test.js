const app = require('./server.js');
const request = require('supertest')(app);

describe('Server', () => {
  it('should have route to get questions', async (done) => {
    let response = await request.get('/qa/questions?product_id=11975');
    expect(response.status).toBe(200);
    // exppect(response.body['product_id']).toBe('11975');
    // expect(response.body.results.length).toBe(5);
    done();
  });

  it('should have route to get answers', async (done) => {
    let response = await request.get('/qa/questions/56462/answers');
    expect(response.status).toBe(200);
    // expect(response.body.length).toBe(5);
    // expect(response.body[0].campus).toEqual(expect.stringMatching('hrnyc'));
    // expect(response.body[0].hasOwnProperty('id')).toBe(true);
    done();
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