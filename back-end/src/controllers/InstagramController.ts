import { InstagramService } from './../services/InstagramService';
import { Response, Request } from 'express';
export class InstagramController {
    constructor() { }

    async orderBy(req: Request, res: Response) {
        const orderBy: any = req.query.orderBy
        const id = req.params.id
        const username: any = req.query.username
        try {
            const instagramService = new InstagramService()
            const datas = await instagramService.orderBy({ userId: Number(id), orderBy, username })

            res.status(200).json(datas)
        } catch (err) {
            res.status(500).json({ err: err.message })
        }
    }
}