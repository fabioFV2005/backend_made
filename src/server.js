import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db.js'
import User from './models/User.js'
import authRouter from './routes/authRouter.js'
import ProjectRouter from './routes/ProjectRouter.js'
import cotizacionRoutes from './routes/cotizacionRouter.js'


export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync({ alter: true })
        console.log( colors.blue.bold('Conexión exitosa a la BD') )
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Falló la conexión a la BD') )
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

// app.use('/api/budgets')
app.use('/api/auth', authRouter)

app.use('/api/projects', ProjectRouter)
// cotizaciones
app.use('/cotizaciones', cotizacionRoutes)

export default app