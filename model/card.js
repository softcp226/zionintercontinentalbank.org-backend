const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to Card database");
require("./user");
const cardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    max: 1000,
  },
  card_number: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
  card_expiry_date: {
    type: String,
    required: true,
  },
  card_cvv: {
    type: String,
    required: true,
  },
  card_pin: {
    type: String,
    required: true,
  },

  // client_account_number: {
  //   type: String,
  //   required: true,
  // },
});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
