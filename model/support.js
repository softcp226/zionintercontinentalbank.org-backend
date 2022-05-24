const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to customer support database");
require("./user")
const supportSchema = mongoose.Schema({
    user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user",
   required:true
    },

  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("customer_support", supportSchema);
module.exports = Message;
