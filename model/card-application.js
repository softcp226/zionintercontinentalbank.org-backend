const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to Card request database");
require("./user");
const cardRequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  account_number: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
  card_pin: {
    type: String,
    required: true,
  },
});

const CardRequest = mongoose.model("cardRequest", cardRequestSchema);
module.exports = CardRequest;
