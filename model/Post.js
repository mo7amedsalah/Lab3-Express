const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
