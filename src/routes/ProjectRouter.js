import express from 'express';
const ProjectRouter = express.Router();
import { crearProject, getProjects, editarProject, eliminarProject } from '../controllers/ProjectController';

router.post('/', crearProject);
router.get('/', getProjects);
router.put('/:id', editarProject); 
router.delete('/:id', eliminarProject); 

export default ProjectRouter;