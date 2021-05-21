import { InstagramController } from './controllers/InstagramController';
import { UserController } from './controllers/UserController';
import { UserMiddleware } from './middlewares/UserMiddleware'
import { Router, Response, Request } from 'express'
const routes = Router()
const userController = new UserController();
const userMiddleware = new UserMiddleware()
const instagramController = new InstagramController();

routes.get('/', (req, res) => {
    res.send('ok')
})
routes.post('/api/v1/user', userController.register)
routes.get('/api/v1/user/:id', userMiddleware.auth, userController.readById)
routes.patch('/api/v1/user/:id', userMiddleware.auth, userController.update)
routes.delete('/api/v1/user/:id', userMiddleware.auth, userController.delete)
routes.post('/api/v1/user/auth', userController.auth)

routes.post('/api/v1/order/:id', userMiddleware.auth, instagramController.orderBy)

export { routes }