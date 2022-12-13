const { msgErrDatabase, msgErrNoInfo, msgSucces } = require("../../constants");
const { sendEmail } = require("../../sendEmail");

const sendFeedback = (req, res) => {
  const { name, phone, email, content } = req.body;

  sendEmail(
    "greenwichad123@gmail.com",
    "",
    "<p><strong>user's name: </strong>" +
      name +
      "</p> <p> <strong>user's phone number: </strong>" +
      phone +
      "</p> <p> <strong>user's email: </strong> " +
      email +
      "</p> <p> <strong>user's feedback: </strong> " +
      content +
      "</p>"
  );
};

module.exports = {
  sendFeedback,
};
