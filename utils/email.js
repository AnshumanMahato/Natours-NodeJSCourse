const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //Create Transporter
  const tranporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //Define emails options
  const mailOptions = {
    from: 'Admin <admin@natours.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //Send Email
  await tranporter.sendMail(mailOptions);
};

module.exports = sendEmail;
