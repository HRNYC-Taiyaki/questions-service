const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Q&A Server listening on port ${port}`);
})
