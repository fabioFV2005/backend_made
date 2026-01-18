import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { crearProyecto, getProjects, editarProject, eliminarProject } from '../controllers/ProjectController.js';
const router = express.Router();

router.post('/',
    authenticate,
    crearProyecto);
router.get('/', getProjects);
router.put('/:id',
    authenticate,
    editarProject); 
router.delete('/:id', eliminarProject); 

export default router;