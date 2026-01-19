import colors from 'colors'
import server from './server.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=> {
    console.log(colors.green(`Server running on port ${PORT}`))
})