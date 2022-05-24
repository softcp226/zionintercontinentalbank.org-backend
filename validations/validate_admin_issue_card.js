const Joi = require("joi");
const validate_admin_issue_card = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    user: Joi.string().required().max(1000),
    card_number: Joi.string().required(),
    card_type: Joi.string().required(),
    card_expiry_date: Joi.string().required(),
    card_cvv: Joi.string().required(),
    card_pin: Joi.string().required(),
  });
  const result = schema.validate({
    admin: req.admin,
    user: req.user,
    card_number: req.card_number,
    card_type: req.card_type,
    card_expiry_date: req.card_expiry_date,
    card_cvv: req.card_cvv,
    card_pin: req.card_pin,
  });
  if (result.error) return result.error.message;
  return true;
};
// console.log(validate_admin_issue_card({}));
module.exports = validate_admin_issue_card;
