const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

const sendVerificationEmail = (user, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Hesab Doğrulama',
    html: `
      <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); padding: 40px; text-align: center; font-family: 'Arial', sans-serif; color: #333;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); display: inline-block; max-width: 600px;">
          <h1 style="color: #555;">Hesabınızı Doğrulayın</h1>
          <p style="color: #777;">Hesabınızı doğrulamaq üçün aşağıdakı linkə tıklayın:</p>
          <a href="${process.env.SITE_URL}/verify/${token}" style="background-color: #6200ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-size: 16px; margin-top: 20px;">Hesabınızı Doğrulayın</a>
          <p style="margin-top: 30px; color: #999;">Bu sorğunu siz etməmisinizsə, lütfən, bu e-məktubu iqnore edin.</p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail
};
