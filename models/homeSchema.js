const mongoose = require("mongoose");

const schema = mongoose.Schema;
const userSchema = new schema({
  email: {
    type: "string",
    unique: true,
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model('data', userSchema);