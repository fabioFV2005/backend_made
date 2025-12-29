import { AuthController } from '../controllers/AuthController.js'
import { body, param } from 'express-validator'
import { Router } from 'express'
import { handleInputErrors } from '../middleware/validation.js'
const router = Router()

router.post('/create-account',
    body('email')
        .notEmpty().isEmail().withMessage('Debe ser un email valido'),
    body('password')
        .notEmpty().isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres'),
    body('fullName')
        .notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    AuthController.createAccount)
router.get('/list-users', AuthController.listUsers)
router.post('/login',
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    AuthController.login)

export default router