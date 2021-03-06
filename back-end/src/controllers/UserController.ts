import { UserService } from './../services/UserService';
import { Response, Request } from 'express';


export class UserController {

  constructor() { }

  async register(req: Request, res: Response) {
    try {
      const userService = new UserService()
      await userService.register(req.body);
      const user = await userService.auth(req.body)

      res.status(201).json(user)
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
      const datas = await userService.auth(req.body)

      res.status(200).json(datas)
    } catch (err) {
      res.status(400)
      res.json({
        message: err.message
      })
    }
  }

  async readById(req: Request, res: Response) {
    try {
      const userService = new UserService()
      const user = await userService.readById(Number(req.params.id));

      res.status(200).json({
        user
      })
    } catch (err) {
      console.log(err)
      res.status(400)
      res.json({
        message: err.message
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userService = new UserService()
      var user = req.body
      await userService.update(user)

      res.status(200).json({ message: "Usuário atualizado!" })
    } catch (err) {
      console.log(err)
      res.status(500)
      res.json({
        message: err.message
      })
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const userService = new UserService()
      await userService.forgotPassword(req.body.email)
      res.status(200).json({ message: 'Enviamos um e-mail para você. click no link que contém nesse e-mail' })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const userService = new UserService()
      await userService.resetPassword(String(req.query.token), req.body.password)
      res.status(200).json({ message: 'Senha redefinida com sucesso!' })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

  async leads(req: Request, res: Response) {
    try {
      const email = req.body.email
      const userService = new UserService()
      await userService.leads(email)
      res.json({ message: 'Parabéns, agora você ja tem o acesso gratuito.' })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}