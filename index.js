const express = require("express");
require("dotenv").config();
const app = express();
let cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/", express.static("html"));
app.use("/admin", express.static("admin"));

const register_user = require("./api/user");
app.use("/api/user/register", register_user);

const login_user = require("./api/login");
app.use("/api/user/login", login_user);
const login_admin = require("./admin_api/login");
app.use("/api/admin/login", login_admin);

const fetch_user = require("./api/fetchUser");
app.use("/api/user/fetchSelf", fetch_user);
const loan_application = require("./api/loan-application");
app.use("/api/user/loan/apply", loan_application);
const customer_support = require("./api/support");
app.use("/api/customer/support", customer_support);
const change_password = require("./api/change-password");
app.use("/api/user/password/change", change_password);
const transaction = require("./api/transaction");
app.use("/api/user/transact", transaction);
const complete_transaction = require("./api/complete_transaction");
app.use("/api/user/transaction/complete", complete_transaction);
const card_application = require("./api/card_application");
app.use("/api/user/card/apply", card_application);
const fetch_card = require("./api/fetch-card");
app.use("/api/user/card/fetch", fetch_card);

const fetch_loan = require("./api/fetch-loan");
app.use("/api/user/loan/fetch", fetch_loan);
const fetch_transactions = require("./api/fetch_transactions");
app.use("/api/user/transactions/fetch", fetch_transactions);

const admin_fetchusers = require("./admin_api/fetch_users");
app.use("/api/admin/fetch_users", admin_fetchusers);
const admin_crud = require("./admin_api/crud_user");
app.use("/api/admin/users", admin_crud);

const admin_fund_debit_user = require("./admin_api/transaction");
app.use("/api/user/debit/credit_user", admin_fund_debit_user);

const admin_issue_card = require("./admin_api/issue_card");
app.use("/api/admin/issue_card", admin_issue_card);

const admin_fetch_card_application = require("./admin_api/fetch_card_applications");
app.use("/api/admin/card_application/fetch", admin_fetch_card_application);

const admin_fetch_loan = require("./admin_api/fech-loan");
app.use("/api/admin/loan/fetch", admin_fetch_loan);

const admin_approve_loan = require("./admin_api/approve_loan");
app.use("/api/admin/approve_loan", admin_approve_loan);

const admin_delete_loan = require("./admin_api/delete_loan");
app.use("/api/admin/delete_loan", admin_delete_loan);

const admin_delete_card_application = require("./admin_api/delete_card_application");
app.use("/api/admin/card_application/delete", admin_delete_card_application);

const admin_fetch_messages = require("./admin_api/fetch_messages");
app.use("/api/admin/support_messages", admin_fetch_messages);
const admin_fetch_transactions=require("./admin_api/fetch_transaction")
app.use("/api/admin/transaction/fetch",admin_fetch_transactions)

const recover_password = require("./api/recover-password");
app.use("/api/user/recover_password", recover_password);

const change_password_02 = require("./api/change-password_02");
app.use("/api/user/change_password_02", change_password_02);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port ${port}`));

// /api/user/card/fetch
