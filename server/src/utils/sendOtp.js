import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendOtp = async (email, otp) =>
{

  const { data, error } = await resend.emails.send({
    from: "AI Notes App <onboarding@resend.dev>",
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
  });

  if (error)
  {
    console.log(error);
  }
}

export { sendOtp }