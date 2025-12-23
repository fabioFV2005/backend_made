import User from '../models/User.js'
import { checkPassword, hashPassword } from '../utils/auth.js'


export class AuthController {
    static createAccount = async (req, res) => {
        const { email, password, fullName } = req.body
        const userExists = await User.findOne({where: {email}})
        if(userExists) {
            const error = new Error('Un usuario con ese email ya esta registrado')
            return res.status(409).json({error: error.message})
        }
        
        try {
            const user = await User.create({
                email,
                password: await hashPassword(password),
                name: fullName || email.split('@')[0]
            })            
            res.status(201).json({message: 'Cuenta Creada Correctamente', user: { id: user.id, email: user.email }})
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}