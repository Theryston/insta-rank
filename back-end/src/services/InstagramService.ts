import { User } from "../database/User";
import axios from "axios"
import { JSDOM } from "jsdom"
import Crawler from 'crawler'

interface IOrder {
    id: number;
    orderBy: string;
    instagram: string;
}

export class InstagramService {
    constructor() { }

    async orderBy({ orderBy, instagram, id }: IOrder) {
        const user: any = await User.findOne({ where: { id } })
        user.buy = true;
        if (!user.buy) {
            throw new Error('Faça o pagamento para usar a ferramenta')
        } else {
            return { orderBy, instagram, id}
        }
    }
}