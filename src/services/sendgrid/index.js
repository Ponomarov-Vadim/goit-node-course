const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_NAME } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const MAIL = {
  registration: {
    from: EMAIL_NAME,
    subject: "Validate email",
    text: "Validate email",
  },
};

const sendEmail = async (email, verifyURL, type) => {
  let result;
  const mailOptions = {
    ...MAIL[type],
    html: `<strong>Hi, welcome to our cite. Verify you'r email: <a target="_blank" href='${verifyURL}'>Clik link</a></strong>`,
    to: email,
  };
  try {
    result = await sgMail.send(mailOptions);
  } catch (error) {
    return fasle;
  }
};

module.exports = { sendEmail };
