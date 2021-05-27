import { PaymentService } from './../services/PaymentService';
import { Request, Response } from 'express';
export class PaymentController {
    constructor() { }

    async pay(req: Request, res: Response) {
        const paymentService = new PaymentService()
        try {
            await paymentService.pay(req.body)
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error })
        }
    }
}