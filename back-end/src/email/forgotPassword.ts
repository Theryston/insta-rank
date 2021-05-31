import ejs from 'ejs'
import { transporter } from './config'

interface IUser {
    name: string;
    email: string;
    password?: string;
}

export class ForgotPasswordMail {
    static async sendEmail(email: string, token: string): Promise<string> {
        try {
            transporter.sendMail({
                from: `Insta Rank <alvaro@prsacademy.com.br>`,
                to: email,
                subject: "Redefinição de senha",
                html: await ejs.renderFile(__dirname + '/forgotPassword.ejs', {
                    url: `https://instarank.com.br/password/reset?token=${token}`
                })
            })
            return ''
        } catch (error) {
            throw error
        }
    }
}