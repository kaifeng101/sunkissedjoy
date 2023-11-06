// const emailTemplate = require('./emailTemplate');
const nodemailer = require("nodemailer");

module.exports = (reciever, template, subject, data) => {
  console.log(reciever);
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
        user: "ngk.ng2@gmail.com",
        pass: "FdaV5PCrpBMf8O6k",
    },
  });
  var mailOptions = {
    from: "contact@sunshinejoy.com", // sender address
    to: [reciever, 'ngkaifeng4@gmail.com'], // list of receivers
    subject: subject || "Message from Joy",
    html: template || `<div>${JSON.stringify(data)}</div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};


