const Joi = require("joi");

const validate_transaction = (req) => {
  const schema = Joi.object({
    // full_name: Joi.string(),
    phone_number: Joi.string(),
    country: Joi.string(),
    address_line: Joi.string(),
    zip_code: Joi.string(),
    swift_code: Joi.string(),
    bank_name: Joi.string(),
    account_name: Joi.string(),
    account_number: Joi.string().required(),
    amount: Joi.number().required().min(1),
    sender: Joi.string().required(),
    reciever: Joi.string(),
    transaction_date: Joi.string(),
    refrence_number: Joi.string(),
    description: Joi.string().required(),
    debit: Joi.string(),
    credit: Joi.string(),
  });
  const result = schema.validate({
    // full_name: req.full_name,
    phone_number: req.phone_number,
    country: req.country,
    address_line: req.address_line,
    zip_code: req.zip_code,
    swift_code: req.swift_code,
    bank_name: req.bank_name,
    account_name: req.account_name,
    account_number: req.account_number,
    amount: req.amount,
    sender: req.user,
    // reciever: req.reciever,
    transaction_date: req.transaction_date,
    refrence_number: req.refrence_number,
    description: req.description,
    debit: req.debit,
    credit: req.credit,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_transaction;
