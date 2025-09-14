const bcrypt = require('bcrypt');

async function hashContrasena(contrasena) {
    return await bcrypt.hash(contrasena, 12)
}

async function compareContrasena(contrasena, hash){
    return await bcrypt.compare(contrasena, hash);
}

async function hashRespuesta(respuesta){
    return await bcrypt.hash(respuesta, 12);
};

async function compareRespuesta(respuesta, hash){
    return await bcrypt.compare(respuesta, hash);
}


module.exports = {
    hashContrasena,
    compareContrasena,
    hashRespuesta,
    compareRespuesta
};