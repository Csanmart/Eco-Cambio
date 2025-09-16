//Configuracion del express
const express = require('express');
const app = express();
const puerto = 4000;
const productsRouter = require('./routers/products-routers');
const comentariosRouter = require('./routers/comentarios-routers');
const database = require('./config/database')
app.use(express.json());

app.use('/products', productsRouter);
app.use('/comentarios', comentariosRouter);


//Configuracion del puerto
app.listen(puerto, ()=>{
    console.log(`Conectado al puerto http://localhost:${puerto}`)
}); 