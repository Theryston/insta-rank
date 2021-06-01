import { Request, Response } from "express";
import { DevicesService } from "../services/DevicesService";

export class DevicesController {
    constructor() { }

    async status(req: Request, res: Response) {
        try {
            const devicesService = new DevicesService()
            const status = req.query.status
            devicesService.status(Number(status))
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async compatible(req: Request, res: Response) {
        try {
            const devicesService = new DevicesService()
            res.status(200).json({ count: await devicesService.compatible() })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async incompatible(req: Request, res: Response) {
        try {
            const devicesService = new DevicesService()
            res.status(200).json({ count: await devicesService.incompatible() })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}