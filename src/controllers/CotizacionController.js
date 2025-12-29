import Cotizacion from '../models/Cotizacion.js'

export const crearCotizacion = async (req, res) => {
    const{ name, phone, size, plans, disponibility, description} = req.body
    try {
        if(!name || !phone || !size || !plans){
            return res.status(400).json({
                sucess: false,
                message: "Faltan campos obligatorios"
            })
        }

        const fechaDisponibilidad = new Date(disponibility);
        if (isNaN(fechaDisponibilidad.getTime())) {
            return res.status(400).json({
                success: false,
                message: "La fecha de disponibilidad tiene un formato inválido. Usa formato: YYYY-MM-DD"
            });
        }

        const nuevaCotizacion = await Cotizacion.create({
            name,
            phone,
            size: parseFloat(size),
            plans,
            disponibility: fechaDisponibilidad,
            description: description || null,
        })
        res.status(201).json({message: 'Cotización creada',
            data: nuevaCotizacion
        }) 
    }catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
}
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


