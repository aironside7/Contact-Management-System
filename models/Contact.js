const mongoose = require("mongoose");
const contSchema = new mongoose.Schema({
  firstName: {
    type : String,
    required: true
  },
  lastName: {
    type : String,
    required: true
  },
  email: {
    type : String,
    required: true,
    unique:true
  },
  phone: {
    type : Number,
    required: true,
    unique:true

  },
});

const Contact = mongoose.model("Contact", contSchema)
module.exports = Contact
