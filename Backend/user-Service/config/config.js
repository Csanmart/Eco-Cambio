const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('users_services', 'root', '',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports = sequelize;