const Pend_transaction = require("../model/pend-transaction");

const create_pend_transaction = async (userInfo) => {
    try{
//   console.log("userinfo", userInfo);
  let pend_transaction = await new Pend_transaction({
    user: userInfo.user,
    debit_transaction: userInfo.debit_transaction,
    credit_transaction: userInfo.credit_transaction,
    otp: userInfo.otp,
  });
  const pend_transaction_result = await pend_transaction.save();
  return pend_transaction_result;
}catch(error){
    return {error:true,errMessage:error.message}
}
};
module.exports = create_pend_transaction;
