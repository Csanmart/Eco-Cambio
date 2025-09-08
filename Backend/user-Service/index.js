const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;
const sequelize = require('./config/config');
const userModel = require('./models/user-models');
const routers = require('./routers/user-routes');
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    crendentials: true
};

app.use(cors(corsOptions));

app.use('/user', routers);

//Sincronizacion con el sequelize y el servidor

(async ()=>{
    try {
        await sequelize.authenticate()
        console.log('Conectado a la base de datos')

        await sequelize.sync()
        console.log('Tabla establecida');

    
        app.listen(port, "0.0.0.0", ()=>{
            console.log(`Conectado a http://localhost:${port}`)
            console.log('conectado a http://192.168.1.50:3000/')
        })
    } catch (error) {
        console.log('Error con el servidor...')
    }
})();





