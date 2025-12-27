import express from 'express'
import { crearCotizacion, getCotizaciones } from '../controllers/CotizacionController'

const router = express.Router()

router.post('/cotizaciones', crearCotizacion)

router.get('/cotizaciones', getCotizaciones)

export default router
