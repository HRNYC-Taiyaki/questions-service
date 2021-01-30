const mongoose = require('mongoose');
const answerSchema = require('../models/answerModel.js');

let CONNECTIONSTRING = process.env.CONNECTIONSTRING || 'mongodb://localhost/test';
mongoose.connect(CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log('Connected to mongoDB');
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = {conn, Answer};
