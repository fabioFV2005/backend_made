import jwt from 'jsonwebtoken';
import User from '../models/User.js';



export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        const error = new Error('No autorizado');
        res.status(401).json({msg: error.message});
    }
    // aqui nos da bearer y el token por eso el split
    const [, token] = bearer.split(' ');
    if(!token) {
        const error = new Error('Token no válido')
        res.status(401).json({error: error.message})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof decoded === 'object' && decoded.id){
            req.user = await User.findByPk(decoded.id,{
                attributes: ['id', 'name', 'email', 'role']
            })
            next();
        }
    } catch (error) {
        res.status(500).json({msg: 'token no valido'});
    }
}
