import { InstagramService } from './../services/InstagramService';
import { Response, Request } from 'express';
export class InstagramController {
    constructor() { }

    async orderBy(req: Request, res: Response) {
        const id = req.params.id
        const orderBy: any = req.query.orderBy
        const instagram: any = req.body.instagram
        try {
            const instagramService = new InstagramService()
            const datas = await instagramService.orderBy({ id: Number(id), orderBy, instagram })

            res.status(200).json(datas)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}