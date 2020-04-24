const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save',async function(next) {
  let user = this;
  if (user.isNew){
    user.password = await bcrypt.hash(user.password,10) ;
  }
 next();
});

const User = mongoose.model('User', schema);
module.exports = User;