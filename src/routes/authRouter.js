import { AuthController } from '../controllers/AuthController.js'
import { Router } from 'express'
const router = Router()


router.post('/create-account', AuthController.createAccount)
router.get('/list-users', AuthController.listUsers)
router.post('/login', AuthController.login)

export default router