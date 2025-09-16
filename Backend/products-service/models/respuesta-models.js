const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
    respuestaId: {type: Number},
    comentarioId: {type: mongoose.Schema.ObjectId, ref: 'comentarios', required: true },
    id_user: {type: Number, required: true}, 
    respuesta: {type: String},
    fecha: {type: Date, default: Date.now}
});

const respuesta = mongoose.model('respuesta', respuestaSchema);

module.exports = respuesta;