import { User } from "../database/User";
import axios from "axios"
import { JSDOM } from "jsdom"
import Crawler from 'crawler'

interface IOrder {
    id: number;
    orderBy: string;
    instagram: any;
}

export class InstagramService {
    constructor() { }

    async orderBy({ orderBy, instagram, id }: IOrder) {
        const userLocal: any = await User.findOne({ where: { id } })
        const facebook_basse_url = 'https://graph.facebook.com/v10.0'

        const user = (await axios.get(facebook_basse_url + '/' + instagram.userID + '?fields=media_count&access_token=' + instagram.accessToken)).data
        const res = (await axios.get(`${facebook_basse_url}/${instagram.userID}/media?fields=like_count,comments_count,media_url,permalink,timestamp,thumbnail_url&limit=${user.media_count}&access_token=${instagram.accessToken}`)).data
        var datas: any = res.data
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].thumbnail_url) {
                datas[i].media_url = datas[i].thumbnail_url
                datas[i].thumbnail_url = undefined;
            }
            datas[i].timestamp = new Date(datas[i].timestamp)
        }

        if (orderBy == 'likes') {
            datas = datas.sort((a: any, b: any) => {
                return b.like_count - a.like_count
            })
        } else if (orderBy == 'comments') {
            datas = datas.sort((a: any, b: any) => {
                return b.comments_count - a.comments_count
            })
        } else {
            datas = datas.sort(function (a: any, b: any) {
                return a.timestamp < b.timestamp;
            });

            if (!userLocal.buy) {
                return { post: datas.splice(6, datas.length), message: 'Faça o pagamento para ter o acesso total a ferramenta' }
            } else {
                return { post: datas, message: 'Ordenagem feita com sucesso' }
            }

        }
    }
}