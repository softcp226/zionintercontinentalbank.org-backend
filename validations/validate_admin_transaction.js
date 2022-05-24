const Joi = require("joi");

const validate_transaction = (req) => {
  const schema = Joi.object({
    admin:Joi.string().required(),
    account_number: Joi.number().required(),
    amount: Joi.number().required().min(1),
    // sender: Joi.string().required(),
    sender_02: Joi.string().required(),
    reciever: Joi.string(),
    transaction_date: Joi.string(),
    refrence_number: Joi.string(),
    description: Joi.string().required(),
    // debit: Joi.string(),
    // credit: Joi.string(),
  });
  const result = schema.validate({
    admin:req.admin,
    account_number: req.account_number,
    amount: req.amount,
    // sender: req.user,
    sender_02: req.sender_02,
    reciever: req.reciever,
    transaction_date: req.transaction_date,
    refrence_number: req.refrence_number,
    description: req.description,
    // debit: req.debit,
    // credit: req.credit,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_transaction;
