import User from '../models/User.js'

export const userExists = async (email) => {
    const user = await User.findOne({where:{email}})
    if(user){
        return true
    }
    return user
}

export const validateCamps = (email, password, fullName) => {
    if(!email || !password || !fullName){
        return false
    }
    return true
}