"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bravo_emil_1 = require("./bravo.emil");
// Create a Nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'communicationsyawa@gmail.com', // Replace with your Gmail email address
        pass: 'rtluplkizldbqwdr', // Replace with your Gmail password
    },
});
// Function to create the email template with inline CSS and simple animations
function createEmailTemplate(subject, body) {
    const logoUrl = 'https://yawa-app.s3.eu-central-1.amazonaws.com/bf763e08-96fb-41cf-8133-897577a41e09.jpeg'; // Replace with your actual logo URL
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        animation: fadeIn 2s ease-in;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header img {
        width: 100%;
        border-radius: 8px 8px 0 0;
        height: 200px;
        object-fit: contain;
      }
      .content {
        padding: 20px;
        color: #333333;
        line-height: 1.6;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 0.9em;
        color: #888888;
      }
      .highlight {
        color: #03BDE9;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #03BDE9;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="${logoUrl}" alt="CONFLUEX Logo">
      </div>
      <div class="content">
        ${body}
      </div>
      <div class="footer">
        Best regards,<br>
        <span class="highlight">Confluex Team</span>
      </div>
    </div>
  </body>
  </html>
  `;
}
// Email content templates
const emailTemplates = {
    verification: (code) => createEmailTemplate('Your OTP Code for Confluex Registration', `<p>Hello,</p>
    <p>To complete your registration on the Confluex App, please use the One-Time Password (OTP) below:</p>
    <h2 class="highlight">${code}</h2>
    <p>This code is valid for the next 15 minutes. Please do not share it with anyone for your security.</p>
    <p>If you didn’t request this code, please ignore this email or contact our support team immediately at support@confluex.com.ng or 07013580030.</p>
    <p>Thank you for choosing Confluex to stay safe!</p>
    `),
    forgotPassword: (otp) => createEmailTemplate('ForgotPassword Code for Confluex APP', `<p>Hello there,</p>
    <p>We've sent you a forgotPassword code to complete your reset your password. Please enter the code below to proceed:</p>
    <h2 class="highlight">OTP: ${otp}</h2>
    <p>This code is valid for 15 minutes. If you didn't request this code, please ignore this email.</p>`),
    welcome: () => createEmailTemplate('Welcome to Confluex: Your Safety, Our Priority!', `<p>Hello</p>
      <p>Welcome to YAWA, your trusted partner for early warning, situational awareness, and emergency reporting. We’re thrilled to have you join our growing community dedicated to making Nigeria safer for everyone</p>
      <p>With Confluex, you can:</p>
      <ul>
      <li>Report emergencies and get real-time assistance.</li>
      <li>Stay updated on critical safety alerts in your area.</li>
      <li>Connect with your safety circle for instant support.</li>
      </ul>
      <b>Get started now by exploring the app and setting up your safety circle.</b>
      <p>Together, we can create safer communities! If you have any questions or need assistance, feel free to contact us at <a href="mailto:upport@yawaapp.com.ng">support@yawaapp.com.ng</a> or 07013580030.</p>
      <p>
      Staysafe,<br>
      The Confluex Team
      </p>
      `),
};
// Functions to send emails with the new templates
function sendVerificationEmail(email, emailVerificationCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const html = emailTemplates.verification(emailVerificationCode);
            // await transporter.sendMail({
            //   from: '"Confluex TEAM" <info@Confluex.com>',
            //   to: email,
            //   subject: 'Your OTP Code for Confluex Registration',
            //   html,
            // });
            (0, bravo_emil_1.sendEmail)(email, "Your OTP Code for Confluex Registration", html);
            console.log('Verification email sent successfully');
        }
        catch (error) {
            console.error('Error sending verification email:', error);
        }
    });
}
function sendForgotPasswordEmail(email, resetPasswordToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Send mail with defined transport object
            const html = emailTemplates.forgotPassword(resetPasswordToken);
            // await transporter.sendMail({
            //   from: '"Confluex TEAM" <info@Confluex.com>', // Replace with your app name and your Gmail email address
            //   to: email,
            //   subject: 'Forgot Password Verification Code',
            //   html,
            // });
            (0, bravo_emil_1.sendEmail)(email, "Forgot Password Verification Code", html);
            console.log('Forgot password email sent successfully');
        }
        catch (error) {
            console.error('Error sending forgot password email:', error);
        }
    });
}
function sendWelcomeEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const html = emailTemplates.welcome();
            yield transporter.sendMail({
                from: '"Confluex TEAM" <info@Confluex.com>',
                to: email,
                subject: 'Welcome to YAWA: Your Safety, Our Priority!',
                html,
            });
            console.log('Welcome email sent successfully');
        }
        catch (error) {
            console.error('Error sending welcome email:', error);
        }
    });
}
