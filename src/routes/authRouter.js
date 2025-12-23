import { AuthController } from '../controllers/AuthController.js'
import { Router } from 'express'

const router = Router()


router.post('/create-account', AuthController.createAccount)

export default router