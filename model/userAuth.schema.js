const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
          username:{
                    type: String,
                    required: [true, "Username is required"]
          },
          name:{
                    type: String,
                    required: [true, "Name is required"]
          },
          password:{
                    type: String,
                    required: [true, "Password is required"]
          }
})

const userAuth = mongoose.model('userAuth', userSchema);

module.exports = userAuth;