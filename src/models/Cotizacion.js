import { DataTypes } from 'sequelize';
import { db } from '../config/db';

const Cotizacion = db.define('Cotizacion',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    size: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    plans: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    disponibility:{
        type: DataTypes.DATE()
    },
    description:{
        type: DataTypes.STRING(250)
    }
},
{
    tableName: 'Cotizacion',
    timestamps: true
});

export default Cotizacion;