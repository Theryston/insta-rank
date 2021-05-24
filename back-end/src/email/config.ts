import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 993,
    secure: true,
    auth: {
      user: "alvaro@prsacademy.com.br",
      pass: "@Senhagenerica1"
    }
});

export { transporter };