import Project from "../models/Project.js";
import multer from 'multer';
import bodyParser from 'body-parser';
export const crearProyecto = async (req, res) => {
    const { name, description, investment, startDate, deliveryDate, location, files } = req.body
    
    try {
        if (!name || !description || !startDate || !location) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios: name, description, startDate o location"
            })
        }
        const nuevoProyecto = await Project.create({
            name,
            description,
            investment: investment ? parseFloat(investment) : null,
            startDate,
            deliveryDate: deliveryDate || null,
            location,
            files: files || null,
            status: status ||'enproceso'
        })
        res.status(201).json({
            message: 'Proyecto creado con éxito',
            data: nuevoProyecto
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al crear el proyecto' })
    }
}

export const getProjects = async (req, res) => {
    try {
        const proyectos = await Project.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json(proyectos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al obtener los proyectos' })
    }
}

export const editarProject = async (req, res) => {
    const { id } = req.params // Obtenemos el ID de la URL
    const { name, description, investment, startDate, deliveryDate, location, files,status } = req.body

    try {
        const proyecto = await Project.findByPk(id)

        if (!proyecto) {
            return res.status(404).json({ message: "Proyecto no encontrado" })
        }

        // Actualizamos los campos
        await proyecto.update({
            name: name || proyecto.name,
            description: description || proyecto.description,
            investment: investment !== undefined ? parseFloat(investment) : proyecto.investment,
            startDate: startDate || proyecto.startDate,
            deliveryDate: deliveryDate || proyecto.deliveryDate,
            location: location || proyecto.location,
            files: files || proyecto.files,
            status: status ||proyecto.status
        })

        res.status(200).json({
            message: 'Proyecto actualizado correctamente',
            data: proyecto
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al editar el proyecto' })
    }
}

export const eliminarProject = async (req, res) => {
    const { id } = req.params

    try {
        const proyecto = await Project.findByPk(id)

        if (!proyecto) {
            return res.status(404).json({ message: "El proyecto que intentas eliminar no existe" })
        }

        await proyecto.destroy()

        res.status(200).json({ message: 'Proyecto eliminado correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Hubo un error al eliminar el proyecto' })
    }
}