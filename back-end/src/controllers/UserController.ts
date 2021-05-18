import { UserService } from './../services/UserService';
import { Response, Request } from 'express';


export class UserController {

  constructor() {}

  async register(req: Request, res: Response) {
    try {
      const userService = new UserService()
      const user = await userService.register(req.body);

      res.status(201).json({
        user
      })
    } catch (err) {
      console.log(err)
      res.status(500)
      res.json({
        message: err.message
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userService = new UserService()
      await userService.destroy(Number(req.params.id))
      res.sendStatus(200)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const userService = new UserService()
      const token = await userService.auth(req.body)

      res.status(201).json({
        token
      })
    } catch (err) {
      console.log(err)
      res.status(401)
      res.json({
        message: err.message
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userService = new UserService()
      await userService.update(req.body)

      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.status(500)
      res.json({
        message: err.message
      })
    }
  }
}