//Configuracion de env
require('dotenv').config()
const {Sequelize}= require('sequelize');


const db= new Sequelize('autenticacion','root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
}
);

function connection(){
    try {
        db.authenticate()
        console.log('Conectado a la base de datos ✅')
    } catch (error) {
        console.log('Error con la conexion 🔴')
    }
};

connection();

module.exports = db;


