const {DataTypes} = require('sequelize');
const sequelize = require('../config/config');


const userModel = sequelize.define('user', {
    id_user:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING,
        unique: true,
        allowNullL: false
    },
},{
    timestamps: true
})

module.exports = userModel