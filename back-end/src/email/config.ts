import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: "alvaro@prsacademy.com.br",
      pass: "@Senhagenerica1"
    }
});

export { transporter };