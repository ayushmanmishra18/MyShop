const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP for Email Verification',
    text: `Your OTP for email verification is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 32px; border-radius: 12px; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1976d2; text-align: center;">Welcome to ModernShop!</h2>
        <p style="font-size: 16px; color: #222; text-align: center;">Thank you for registering. Please use the OTP below to verify your email address:</p>
        <div style="background: #1976d2; color: #fff; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px; border-radius: 8px; text-align: center; margin: 24px 0;">${otp}</div>
        <p style="font-size: 15px; color: #444; text-align: center;">This OTP will expire in <b>10 minutes</b>.</p>
        <p style="font-size: 13px; color: #888; text-align: center; margin-top: 32px;">If you did not request this, you can safely ignore this email.</p>
        <p style="font-size: 13px; color: #888; text-align: center; margin-top: 8px;">&copy; ${new Date().getFullYear()} ModernShop</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendOTPEmail }; 