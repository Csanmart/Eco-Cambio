//Configuracion de env
require('dotenv').config();
//database
const db = require('./configuracion/configDb');
//Configuracion de express
const express = require('express');
const app = express();
const puerto = process.env.PORT || 4000

//configuracion de app
app.use(express.json());

app.listen(puerto, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${puerto}`);
})