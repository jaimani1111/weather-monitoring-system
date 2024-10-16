const nodemailer = require('nodemailer');
require('dotenv').config();

//  transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

/**
 * Sends an email alert when the temperature exceeds the threshold.
 * @param {number} temperature - The current temperature.
 */
function sendAlert(temperature) {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: process.env.ALERT_EMAIL, 
    subject: 'Weather Alert: Temperature Exceeded',
    text: `Alert! The temperature has exceeded your threshold. Current temperature: ${temperature}°C`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error sending email: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
  });
}

module.exports = {
  sendAlert,
};
