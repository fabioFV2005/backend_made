import { DataTypes } from 'sequelize';
import { db } from '../config/db.js';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'SALES', 'USER'),
        defaultValue: 'USER'
    }
}, {
    tableName: 'users',
    timestamps: true
});

export default User;