// database.js

// Importa el módulo Sequelize desde 'sequelize' para manejar la base de datos
const { Sequelize } = require('sequelize');

// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize('db_sfi_tap', 'capiedrahita1', 'C@ps*7414', {
    host: 'localhost',          // Dirección del servidor de la base de datos
    dialect: 'mysql'            // Dialecto de base de datos que estamos utilizando
});

// Intenta conectar a la base de datos
sequelize.authenticate()
    .then(() => {
        // Mensaje de éxito si la conexión se establece correctamente
        console.log('Conexión a MySQL establecida correctamente.');
    })
    .catch(err => {
        // Mensaje de error si la conexión falla
        console.error('No se pudo conectar a MySQL:', err);
    });

// Exporta la instancia de Sequelize para ser utilizada en otras partes de la aplicación
module.exports = sequelize;
