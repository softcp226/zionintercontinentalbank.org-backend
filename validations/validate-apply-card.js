const Joi = require("joi");

const validateApplyCard = (req) => {
  const schema = Joi.object({
    card_number: Joi.string().required().min(10).max(1000),
    card_expiry_date: Joi.string().required().max(1000),
    card_cvv: Joi.string().required().max(1000),
    card_pin: Joi.string().required().max(1000),
    card_type: Joi.string().required().max(1000),
    client_account_number: Joi.string().required().min(10).max(1000),
  });
  const result = schema.validate({
    card_number: req.card_number,
    card_expiry_date: req.card_expiry_date,
    card_cvv: req.card_cvv,
    card_pin: req.card_pin,
    card_type: req.card_type,
    client_account_number: req.client_account_number,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validateApplyCard;
