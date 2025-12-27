const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    investment: {
        type: DataTypes.DECIMAL(15, 2), 
        allowNull: true ,
    },
    startDate: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    deliveryDate: {
        type: DataTypes.DATE(),
        allowNull: true
    },
    location: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    files: {
        type: DataTypes.STRING(250), 
        allowNull: true
    }
}, {
    tableName: 'Projects',
    timestamps: true 
});

export default Project