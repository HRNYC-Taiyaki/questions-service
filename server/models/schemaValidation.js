const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = {
  photoSchema: new Schema({
    url: { type: String, required: true },
  }),
  photoLimit: (photos) => {
    photos.length <= 5;
  },
  boolVal: (val) => {
    return val === 0 || val === 1;
  },
};
