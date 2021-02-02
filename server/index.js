const app = require('./server.js');

const SERVER_PORT = process.env.SERVER_PORT || 3010;

app.listen(SERVER_PORT, () => {
  console.log(`Q&A Server listening on port ${SERVER_PORT}`);
});
