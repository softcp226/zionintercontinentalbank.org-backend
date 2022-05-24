const Joi = require("joi");
const validate_delete_loan = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    // user: Joi.string().required().max(1000),
    card_application: Joi.string().required().max(1000),
  });
  const result = schema.validate({
    admin: req.admin,
    // user: req.user,
    card_application: req.card_application,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_delete_loan;
