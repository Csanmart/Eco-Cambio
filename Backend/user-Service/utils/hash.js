const bcrypt = require('bcrypt');

async function hashContrasena(contrasena) {
    return await bcrypt.hash(contrasena, 12)
}

async function compareContrasena(contrasena, hash){
    return await bcrypt.compare(contrasena, hash);
}

module.exports = {
    hashContrasena,
    compareContrasena
}

