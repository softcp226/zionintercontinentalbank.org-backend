const Joi = require("joi");
const validate_card_application = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    account_number: Joi.string().required().max(1000),
    card_type: Joi.string().required(),
    card_pin: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
    account_number: req.account_number,
    card_type: req.card_type,
    card_pin: req.card_pin,
  });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_card_application;
