// routes/Log.js
const express = require('express');
const router = express.Router();
const User = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Ruta: POST /Log/register
// Endpoint para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, apellido, cedula, fecha_de_nacimiento, rol, nombre_de_usuario, contraseña } = req.body;

    try {
        // Crea un nuevo usuario en la base de datos
        const user = await User.create({ 
            nombre, 
            apellido, 
            cedula, 
            fecha_de_nacimiento, 
            rol, 
            nombre_de_usuario, 
            contraseña 
        });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error });
    }
});

// Ruta: POST /Log/login
// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
    const { nombre_de_usuario, contraseña } = req.body;

    try {
        // Busca al usuario en la base de datos por nombre de usuario
        const user = await User.findOne({ where: { nombre_de_usuario } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Autenticación satisfactoria' });
    } catch (error) {
        res.status(500).json({ message: 'Error en la autenticación', error });
    }
});

// Ruta: GET /Log/user/:nombre_de_usuario
// Endpoint para obtener los datos de un usuario por nombre de usuario
router.get('/user/:nombre_de_usuario', async (req, res) => {
    const { nombre_de_usuario } = req.params; // Obtiene el nombre de usuario de los parámetros

    try {
        // Busca al usuario en la base de datos
        const user = await User.findOne({ where: { nombre_de_usuario } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user); // Devuelve los datos del usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar usuario', error });
    }
});

// Ruta: DELETE /Log/user/:nombre_de_usuario
// Endpoint para eliminar un usuario por nombre de usuario
router.delete('/user/:nombre_de_usuario', async (req, res) => {
    const { nombre_de_usuario } = req.params; // Obtiene el nombre de usuario de los parámetros

    try {
        // Elimina al usuario de la base de datos
        const result = await User.destroy({ where: { nombre_de_usuario } });
        if (result === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
});

// Ruta: PUT /Log/user/:nombre_de_usuario
// Endpoint para actualizar todos los datos de un usuario por nombre de usuario
router.put('/user/:nombre_de_usuario', async (req, res) => {
    const { nombre_de_usuario } = req.params; // Obtiene el nombre de usuario de los parámetros
    const { nombre, apellido, cedula, fecha_de_nacimiento, rol, nombre_de_usuario: nuevoNombreDeUsuario, contraseña } = req.body;

    try {
        const user = await User.findOne({ where: { nombre_de_usuario } }); // Busca el usuario en la base de datos
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta si el usuario no existe
        }
        
        // Reemplaza todos los campos con los valores proporcionados
        user.nombre = nombre; // Reemplaza nombre
        user.apellido = apellido; // Reemplaza apellido
        user.cedula = cedula; // Reemplaza cédula
        user.fecha_de_nacimiento = fecha_de_nacimiento; // Reemplaza fecha de nacimiento
        user.rol = rol; // Reemplaza rol
        user.nombre_de_usuario = nuevoNombreDeUsuario; // Reemplaza nombre de usuario
        if (contraseña) {
            user.contraseña = await bcrypt.hash(contraseña, 10); // Encripta la nueva contraseña
        }

        await user.save(); // Guarda los cambios
        res.status(200).json({ message: 'Usuario actualizado exitosamente' }); // Respuesta de éxito
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error }); // Respuesta de error
    }
});


// Ruta: PATCH /Log/user/:nombre_de_usuario
// Endpoint para actualizar algunos datos de un usuario por nombre de usuario
router.patch('/user/:nombre_de_usuario', async (req, res) => {
    const { nombre_de_usuario } = req.params; // Obtiene el nombre de usuario de los parámetros
    const updates = req.body; // Obtiene los campos a actualizar

    try {
        // Busca al usuario en la base de datos
        const user = await User.findOne({ where: { nombre_de_usuario } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Actualiza solo los campos que se envían en la solicitud
        if (updates.nombre) user.nombre = updates.nombre;
        if (updates.apellido) user.apellido = updates.apellido;
        if (updates.cedula) user.cedula = updates.cedula;
        if (updates.fecha_de_nacimiento) user.fecha_de_nacimiento = updates.fecha_de_nacimiento;
        if (updates.rol) user.rol = updates.rol;
        if (updates.nombre_de_usuario) user.nombre_de_usuario = updates.nombre_de_usuario;
        if (updates.contraseña) user.contraseña = await bcrypt.hash(updates.contraseña, 10);

        await user.save(); // Guarda los cambios
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
});

module.exports = router;
