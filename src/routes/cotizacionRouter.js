import express from 'express';
import { crearCotizacion, getCotizaciones } from '../controllers/cotizacionController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/', upload.single('plans'), crearCotizacion);
router.get('/', getCotizaciones);

export default router;
