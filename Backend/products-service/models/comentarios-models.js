const mongoose = require('mongoose');

const comentarioShema = new mongoose.Schema({
    idComent: {type: Number},
    productoId: {type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true},
    id_user: {type: Number, required: true},
    comentario : {type: String},
    fecha: {type: Date, default: Date.now}
});


const comentario = mongoose.model('comentarios', comentarioShema);

module.exports = comentario;


