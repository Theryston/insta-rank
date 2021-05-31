import { ForgotPasswordMail } from './../email/forgotPassword';
import { User } from '../database/User';
import { Token } from '../database/Token';
import bcrypt from 'bcryptjs';
import util from 'util';
import jwt from 'jsonwebtoken';
const jwtSign = util.promisify(jwt.sign)

const jwtSecret = 'kwksjdbdbdjwkajdhsjam'

interface IUser {
    name: string;
    email: string;
    password: string;
    instagram_token?: string;
    instagram_id?: string;
    buy: boolean | undefined;
    id?: number;
    created_at?: Date;
    updated_at?: Date;
}

class UserService {
    constructor() { }

    async register(params: IUser) {
        const userExists: any = await User.findOne({ where: { email: params.email } })
        if (userExists) {
            userExists.password = undefined
            return userExists;
        }
        params.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10))
        const user: any = await User.create(params)
        user.password = undefined
        return user;
    }

    async readById(id: number) {
        return await User.findOne({ where: { id } })
    }

    async destroy(id: number) {
        await User.destroy({ where: { id } })
    }

    async auth({ password, email }: IUser) {
        const user: any = await User.findOne({ where: { email } })

        if (!user) throw new Error("Usuário ainda não cadastrado")

        const correctPassword = bcrypt.compareSync(password, user.password)

        if (correctPassword) {
            const token = await jwtSign({ userId: user.id }, jwtSecret)
            user.password = undefined
            return { token, user }
        }

        throw new Error('Senha incorreta!')
    }

    async update(user: IUser) {
        user.id = undefined
        user.buy = undefined

        if (user.password) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
        }

        try {
            await User.update(user, { where: { email: user.email } })
            return 'ok';
        } catch (error) {
            throw error
        }
    }

    async forgotPassword(email: string) {
        const user: any = await User.findOne({ where: { email } })
        if (user) {
            const token = this.stringRender(50)
            await Token.create({ token, userId: user.id })
            await ForgotPasswordMail.sendEmail(user.email, token)
            return "ok"
        } else {
            throw new Error('Usuário ainda não cadastrado')
        }
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const datas: any = await Token.findOne({ where: { token }, include: [{ model: User }] })
            newPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
            await User.update({ password: newPassword }, { where: { id: datas.user.id } })
            return 'ok'
        } catch (error) {
            throw error
        }
    }

    private stringRender(tamanho: number) {
        var stringAleatoria = '';
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
}

export { UserService }