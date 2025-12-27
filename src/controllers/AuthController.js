import User from '../models/User.js'
import { checkPassword, hashPassword } from '../utils/auth.js'
import { generateJWT } from '../utils/jwt.js'
import { userExists, validateCamps } from '../utils/validator.js'


export class AuthController {



    static createAccount = async (req, res) => {
        const { email, password, fullName } = req.body
        if(await userExists(email)){
            return res.status(400).json({error: 'El usuario ya existe'})
        }
        if(!validateCamps(email, password, fullName)){
            return res.status(400).json({error: 'Todos los campos son obligatorios'})
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
    static listUsers = async (req, res) => {
        try {
            const user = await User.findAll()
            res.status(200).json({user})
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static login = async (req, res) => {
        const {email, password} = req.body
        try {
            const user = await User.findOne({where:{email}})
            if(!user){
                res.status(404).json({error: 'Usuario no encontrado'})
            }
            const passwordMatch = await checkPassword(password, user.password)
            if(!passwordMatch){
                res.status(401).json({error: 'Contraseña incorrecta'})
            }
            // generamos el jwt con el id del usuario
            const token = generateJWT(user.id)
            res.json(token)

        }catch (error) {

        }
    }

    // static updateUser = async(req, res) =>{
    //     const {email, fullName} = req.body
    //     try {
    //         if(){

    //         }
    //     } catch (error) {
            
    //     }
    // }

}