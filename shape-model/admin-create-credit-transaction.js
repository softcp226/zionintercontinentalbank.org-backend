const Transaction = require("../model/transaction");

const create_credit_transaction = async (req, reciever) => {
  // let currentdate = new Date();
  // let datetime = `${currentdate.getFullYear()}-${
  //   currentdate.getMonth() + 1
  // }-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  // let ref = Math.floor(Math.random() * 1000);

  let currentdate = new Date();
  let datetime = `${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()}-${currentdate.getFullYear()}  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  
  let ref = Math.floor(Math.random() * 1000);

  let transaction = await new Transaction({
    // full_name: req.body.full_name || null,
    // phone_number: req.body.phone_number || null,
    // country: req.body.country || null,
    // address_line: req.body.address_line || null,
    // zip_code: req.body.zip_code || null,
    // swift_code: req.body.swift_code || null,
    // bank_name: req.body.bank_name || null,
    // account_name: req.body.account_name || null,
    account_number: req.body.account_number,
    amount: req.body.amount,
    // sender: req.body.user,
    reciever: reciever,
    sender_02: req.body.sender_02,
    transaction_date: req.body.transaction_date || datetime,
    refrence_number: `Ref#${++ref} `,
    description: req.body.description,
    credit: `$${req.body.amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    status: "success",
  });
  let transaction_result = await transaction.save();
  //   console.log(transaction_result);
  return transaction_result;
};

module.exports = create_credit_transaction;
