const mongoose = require('mongoose');

let CONNECTIONSTRING = process.env.CONNECTIONSTRING || 'mongodb://localhost/test';
mongoose.connect(CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoDB');
});

module.exports = db;
