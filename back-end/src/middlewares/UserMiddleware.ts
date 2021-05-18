import jwt from 'jsonwebtoken'
import { User } from '../database/User'
import { Request, Response } from 'express';
const jwtSecret = 'kwksjdbdbdjwkajdhsjam'


export class UserMiddleware {
  constructor() {}

  auth(req: Request, res: Response, next: any) {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
      const token = authToken.split(' ')

      jwt.verify(token[1], jwtSecret, async (error: any, data: any) => {
        if (error) {
          res.status(401);
          res.json({
            message: "Token de login inválido!"
          });
        } else if (req.params.id == data.userId) {
          next()
        } else {
          res.status(401)
          res.json({
            message: 'Usuário não é o mesmo logado!'
          })
        }
      });
    } else {
      res.status(401);
      res.json({
        message: "O usuário não está logado, e para acessar esta página ele precisa está"
      });
    }
  }
}