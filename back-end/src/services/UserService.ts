import { User } from '../database/User';
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
        params.buy = undefined
        params.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10))
        const user: any = await User.create(params)
        user.password = undefined
        return user;
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
            return token
        }

        throw new Error('Senha incorreta!')
    }

    async update(user: IUser) {
        user.id = undefined
        user.buy = undefined
        user.instagram_token = undefined

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
}

export { UserService }