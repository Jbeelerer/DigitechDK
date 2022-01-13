import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default async function handler(req, res) {
  const { name, age, mail, tel } = req.body;
  const subject = 'Not a scam';
  const from = 'From: Real Person <absender@jbeeler.ch>';
  const text = `Guten Abend, Ich bin ${name} und ${age} Jahre alt. Wenn Sie mich kennenlernen wollen, können Sie mich gerne unter: ${tel} erreichen`;

  try {
    const message = await transporter.sendMail({
      from,
      to: mail,
      subject,
      text,
    });
    res.json(message);
  } catch (error) {
    res.status(400).json(error);
  }
}
