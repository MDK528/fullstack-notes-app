import { mailTransport } from "../config/mail.js";

const sendOTPmail = async (email, otp)=> {
    try{
        const mailOptions = {
        from: `Notes app ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Your OTP Verification Code",
        html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this, you can safely ignore it.</p>
        </div>`,
    }
        const info = await mailTransport.sendMail(mailOptions);

        console.log("OTP Email Sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Email Send Failed:", error.message);
        return false;
    }
}

export {sendOTPmail}