import ejs from 'ejs'
import { transporter } from './config'

interface IUser {
    name: string;
    email: string;
    password?: string;
}

export class PaidMail {
    static async paid(user: IUser): Promise<string> {
        try {
            transporter.sendMail({
                from: `Insta Rank <alvaro@prsacademy.com.br>`,
                to: user.email,
                subject: "Seu pagamento foi confirmado",
                html: await ejs.renderFile(__dirname +'/paid.ejs', {
                    user: user
                })
            })
            return ''
        } catch (error) {
            throw error
        }
    }
}