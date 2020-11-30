const mongoose = require('mongoose');

const { Schema } = mongoose;

const Comments = new Schema({
  issue_id: {
    type: Number,
    required: true,
  },
  comments: [{
    userType: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  }],
});

module.exports = mongoose.model('comments', Comments);
