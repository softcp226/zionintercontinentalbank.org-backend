const Joi=require("joi")

const validate_support=(req)=>{
 const schema = Joi.object({
   user: Joi.string().required().max(1000),
   message:Joi.string().required()
 });
 const result = schema.validate({ user: req.user,message:req.message });
 if (result.error) return result.error.message;
 return true;
}
module.exports=validate_support