const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to user database");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 3,
  },
  last_name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  residential_address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  name_and_address_of_employer: {
    type: String,
    required: true,
  },
  beneficiary_legal_name: {
    type: String,
    required: true,
  },
  beneficiary_occupation: {
    type: String,
    required: true,
  },
  beneficiary_email_address: {
    type: String,
    required: true,
  },
  beneficiary_mobile_number: {
    type: String,
    required: true,
  },
  relationship_with_beneficiary: {
    type: String,
    required: true,
  },
  beneficiary_age: {
    type: String,
    required: true,
  },
  security_question_one: {
    type: String,
    required: true,
  },
  security_answer_one: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  account_type: {
    type: String,
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
  enrollment_date: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_suspended: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
