const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/config');
const useModel = require('./models/user-models')
const routers = require('./routers/user-routes')


app.use(express.json());

app.use('/user', routers);


//Sincronizacion con el sequelize y el servidor

(async ()=>{
    try {
        await sequelize.authenticate()
        console.log('Conectado a la base de datos')

        await sequelize.sync()
        console.log('Tabla establecida');

        

        app.listen(port, ()=>{
            console.log(`Conectado a http://localhost:${port}`)
        })
    } catch (error) {
        console.log('Error con el servidor...')
    }
})();





