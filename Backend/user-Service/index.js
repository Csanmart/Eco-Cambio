const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/config');
const routers = require('./routers/user-routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configuración CORS
const corsOptions = {
  origin: ['http://localhost:5173'], // tu frontend (vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
};
app.use(cors(corsOptions));

// Rutas
app.use('/user', routers);

// Iniciar servidor y DB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');

    await sequelize.sync();
    console.log('Tablas listas');

    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Servidor user corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.log('❌ Error con el servidor...', error);
  }
})();
