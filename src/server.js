import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import cors from "cors"
import dotenv from "dotenv"
import { db } from './config/db.js'
import User from './models/User.js'
import authRouter from './routes/authRouter.js'
import cotizacionRoutes from './routes/cotizacionRouter.js'

dotenv.config()
const app = express()

const FRONT_PORT = process.env.FRONT_PORT || 5173;

app.use(cors({
  origin: `http://localhost:${FRONT_PORT}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

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

app.use(morgan('dev'))

app.use(express.json())

// app.use('/api/budgets')
app.use('/api/auth', authRouter)

// cotizaciones
app.use('/cotizaciones', cotizacionRoutes)

export default app