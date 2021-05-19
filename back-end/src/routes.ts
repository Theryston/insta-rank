import { UserController } from './controllers/UserController';
import { UserMiddleware } from './middlewares/UserMiddleware'
import { Router, Response, Request } from 'express'
const routes = Router()
const userController = new UserController();
const userMiddleware = new UserMiddleware()

routes.post('/api/v1/user', userController.register)
routes.get('/api/v1/user/:id', userMiddleware.auth, userController.readById)
routes.patch('/api/v1/user/update/:id', userMiddleware.auth, userController.update)
routes.delete('/api/v1/user/:id', userMiddleware.auth, userController.delete)
routes.post('/api/v1/user/auth', userController.auth)

export { routes }