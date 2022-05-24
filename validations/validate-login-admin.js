const Joi = require("joi");
const validate_login = (req) => {
  const schema = Joi.object({
    user_name: Joi.string().required().min(6),
    password: Joi.string().required().min(8),
  });
  const result = schema.validate({
    user_name: req.user_name,
    password: req.password,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_login;
