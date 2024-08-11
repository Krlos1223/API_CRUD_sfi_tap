// models/Usuario.js

// Importa las dependencias necesarias
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/database'); // Importa la instancia de Sequelize

// Define el modelo de usuario para la tabla 'usuarios'
const User = sequelize.define('User', {
    // ID único para cada usuario, se incrementa automáticamente
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // Nombre del usuario, no puede ser nulo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Apellido del usuario, no puede ser nulo
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Cédula del usuario, no puede ser nula
    cedula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Fecha de nacimiento del usuario, no puede ser nula
    fecha_de_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // Rol del usuario (por ejemplo, Administrador, Usuario), no puede ser nulo
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Nombre de usuario único para el usuario, no puede ser nulo
    nombre_de_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // Contraseña del usuario, no puede ser nula
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Nombre de la tabla en la base de datos
    tableName: 'usuarios', // Asegúrate de usar el nombre correcto de la tabla
    // Desactiva los campos de fecha de creación y actualización automáticos
    timestamps: false
});

// Hook para encriptar la contraseña antes de guardar el usuario
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10); // Genera un salt para encriptar la contraseña
    user.contraseña = await bcrypt.hash(user.contraseña, salt); // Encripta la contraseña
});

// Exporta el modelo para usarlo en otras partes de la aplicación
module.exports = User;

// Este archivo define el modelo para la tabla 'usuarios' en la base de datos.
