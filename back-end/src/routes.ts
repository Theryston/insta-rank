import { PaymentController } from './controllers/PaymentController';
import { InstagramController } from './controllers/InstagramController';
import { UserController } from './controllers/UserController';
import { UserMiddleware } from './middlewares/UserMiddleware'
import { Router, Response, Request } from 'express'
const routes = Router()
const userController = new UserController();
const userMiddleware = new UserMiddleware()
const instagramController = new InstagramController();
const paymentController = new PaymentController()

routes.get('/', (req, res) => {
    res.send('ok')
})

// user
routes.post('/api/v1/user', userController.register)
routes.get('/api/v1/user/:id', userMiddleware.auth, userController.readById)
routes.patch('/api/v1/user/:id', userMiddleware.auth, userController.update)
routes.delete('/api/v1/user/:id', userMiddleware.auth, userController.delete)
routes.post('/api/v1/user/auth', userController.auth)

// instagram
routes.post('/api/v1/order/:id', userMiddleware.auth, instagramController.orderBy)

// payment
routes.post('/api/v1/pay', paymentController.pay)

export { routes }