const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  //service: '163',
  host: 'smtp.p1.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: 'ai-operations@p1.com',
    pass: 'Tantanai0108',
  },

});
module.exports = function sendEmail(subject, message) {
  const mailOptions = {
    from: 'ai-operations@p1.com',
    to:'liyan@p1.com, wuzuxiang@p1.com',
    // to:'ai@p1.com',
    subject,
    html: message,
  };
  transport.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};