import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    secure: false,
    auth: {
      user: "contato@ileaxedeogumeoxum.com",
      pass: "I0810131923@"
    }
});

export { transporter };