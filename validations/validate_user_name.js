const Joi = require("joi");
const validate_user_name = (req) => {
  const schema = Joi.object({
    user_name: Joi.string().required().max(1000),
  });
  const result = schema.validate({
    user_name: req.user_name,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user_name;
