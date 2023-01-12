const UserModel = require("./user.model");
const { createTryAndCatch } = require("../../utils/catchError");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/ConfirmEmail");
// sign up
exports.signUp = createTryAndCatch(async (req, res, next) => {
  //  first find user
  const user = await UserModel.findOne({ email: req.body.email });
  // second if user is exits
  if (user) return next(new AppError("email already exits", 200));
  // if user not exits
  let isUser = new UserModel(req.body);
  await isUser.save();
  let token = jwt.sign(
    { email: isUser.email },
    process.env.secretTokenConfirmEmail
  );
  let message = `<a href="${process.env.HOST}/users/verify/${token}">follow to active account </a>`;
  sendEmail({ email: req.body.email, message });
  res.status(200).json({ message: "success" });
});
// sign in
exports.signIn = createTryAndCatch(async (req, res, next) => {
  //  first find user
  const user = await UserModel.findOne({ email: req.body.email });
  //  if user password or email is incorrect
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    res.status(200).json({ message: "email or password incorrect" });
  }
  // if user correct and send token
  let token = jwt.sign(
    {
      userId: user._id,
      name1: user.firstName,
      name2: user.lastName,
      email: user.email,
      img: user.profile_Pic,
      phone: user.Phone,
      addresses:user.addresses
    },
    process.env.secretToken
  );
  //  if user not confirm email
  if (user.confirmEmail == false)
    return next(new AppError(" chick your email to confirm your email ", 201));
  //  to success all
  res.status(200).json({ message: "success", token });
});
// confirm email
exports.confirmEmail = createTryAndCatch(async (req, res, next) => {
  let token = req.params.token;
  jwt.verify(
    token,
    process.env.secretTokenConfirmEmail,
    async function (err, decoded) {
      if (err) return next(new AppError(401, `error token ${err}`));
      let user = await UserModel.findOne({ email: decoded.email });
      if (!user) return next(new AppError(401, "user not found"));
      await UserModel.findOneAndUpdate(
        { email: decoded.email },
        { confirmEmail: true }
      );
      res.status(200).json({ message: "verified" });
    }
  );
});
 
 
