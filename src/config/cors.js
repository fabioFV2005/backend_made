import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
export const corsConfig = {
  origin: (origin, callback) => {
    const allowed = process.env.FRONTEND_URL

    if (!origin) return callback(null, true)
    if (origin === allowed) return callback(null, true)
    return callback(null, false)
  }
}
