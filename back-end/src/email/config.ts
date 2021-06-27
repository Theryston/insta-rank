import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: {
      user: "servicos@instarank.com.br",
      pass: "@Senhagenerica1"
    }
});

export { transporter };