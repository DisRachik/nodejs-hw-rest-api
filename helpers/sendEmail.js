const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: 'Rachik.ig@gmail.com',
//   from: 'disrachik@meta.ua',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

const sendEmail = async (email) => {
  return sgMail.send({ ...email, from: SENDGRID_SENDER_EMAIL });
};

module.exports = sendEmail;
