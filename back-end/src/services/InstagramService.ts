import { User } from "../database/User";
import axios from "axios"
import { JSDOM } from "jsdom"
import Crawler from 'crawler'

interface IOrder {
    userId: number;
    orderBy: string;
    username: string;
}

export class InstagramService {
    constructor() { }

    async orderBy({ orderBy, username, userId }: IOrder) {
        const user: any = await User.findOne({ where: { id: userId } })
        user.buy = true;
        if (!user.buy) {
            throw new Error('Faça o pagamento para usar a ferramenta')
        } else {

            return 'ok'
        }
    }
}