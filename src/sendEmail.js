const nodemailer = require("nodemailer");

const sendEmail = async (email, message, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hoangpbgch190102@fpt.edu.vn", // generated ethereal user
      pass: "hoangka123456", // generated ethereal password
    },
    tls: { rejectUnauthorized: false },
  });

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: "hoangpbgch190102@fpt.edu.vn", // sender address
      to: email, // list of receivers
      subject: "VietnamTravel announcement", // Subject line
      text: message,
      html: html,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

module.exports = { sendEmail };
