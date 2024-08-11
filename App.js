// App.js

// Importa los módulos necesarios
const express = require('express'); // Framework para crear el servidor web
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las solicitudes
const app = express(); // Crea una instancia de la aplicación Express
const sequelize = require('./db/database'); // Importa la configuración de la base de datos

// Configura el middleware para parsear JSON en el cuerpo de las solicitudes
app.use(bodyParser.json());

// Importa las rutas de autenticación desde el archivo 'Log.js'
const authRoute = require('./Routes/Log');

// Usa las rutas de autenticación en la ruta base '/Log'
app.use('/Log', authRoute);

/**
 * Endpoint: GET /
 * Respuesta simple para probar que el servidor está funcionando.
 */
app.get('/', (req, res) => {
  res.send('Prueba respuesta del servidor');
});

// Inicia el servidor en el puerto 3002
app.listen(3002, () => {
  console.log('Servidor escuchando en el puerto 3002');
});
