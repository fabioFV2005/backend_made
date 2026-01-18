import Cotizacion from '../models/Cotizacion.js'

export const crearCotizacion = async (req, res) => {
    const { name, phone, size, disponibility, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ success: false, message: "Se requiere un archivo para 'plans'" });
    }

    try {
        if (!name || !phone || !size) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios"
            });
        }

        const fechaDisponibilidad = new Date(disponibility);
        if (isNaN(fechaDisponibilidad.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Formato de fecha inválido. Use YYYY-MM-DD"
            });
        }

        const nuevaCotizacion = await Cotizacion.create({
            name,
            phone,
            size: parseFloat(size),
            plans: req.file.path, // guardamos la ruta del archivo
            disponibility: fechaDisponibilidad,
            description: description || null,
        });

        res.status(201).json({
            message: 'Cotización creada',
            data: nuevaCotizacion
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error' });
    }
};

export const getCotizaciones = async (req, res) => {
    try{
        const cotizaciones = await Cotizacion.findAll({
            //lo ordenamos por fecha de creacion0
            order: [['createdAt', 'DESC']]
        })
    res.status(200).json(cotizaciones)
    }catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
}


