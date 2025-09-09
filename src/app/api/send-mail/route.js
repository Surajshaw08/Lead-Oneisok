import nodemailer from 'nodemailer';

export async function POST(req) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL_USER,
    subject: 'New Quote Request',
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Address: ${data.address}
      Service: ${data.service}
      Budget: ${data.budget}
      Priority: ${data.priority}
      Launch Date: ${data.launchDate}
      Comments: ${data.comments}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}