const nodemailer = require("nodemailer");
const { createTryAndCatch } = require("./catchError");

module.exports.sendEmail = createTryAndCatch(async (option) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "salahlever@gmail.com",
      pass: "kfzzsueacmathicl",
    },
  });
  let info = await transporter.sendMail({
    from: "salahlever@gmail.com", // sender address
    to: option.email, // list of receivers
    subject: "confirm", // Subject line
    html: option.message, // html body
  });
});
