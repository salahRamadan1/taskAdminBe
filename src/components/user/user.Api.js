const app = require("express").Router();
const {
  signUp,
  signIn,
  confirmEmail,
} = require("./user.service");
app
  .post("/signUp", signUp)
  .post("/signIn", signIn)
  .get("/verify/:token", confirmEmail);

module.exports = app;
