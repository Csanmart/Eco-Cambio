const mongoose = require('mongoose');


const productShema =  new mongoose.Schema({
    id: {type: Number},
    imagen: {type: String}, //Aqui se guardara la ruta o URl
    nombre: {type: String, required: true},
    precio: {type: Number, required: false},
    tipo: {type: String, enum: ['venta', 'donacion'], requerid: true},
    categoria: {type: String, enum: [
        'Plástico',
        'Vidrio',
        'Metal',
        'Papel',
        'Cartón',
        'Orgánico',
        'Electrónicos',
        'Textiles',
        'Otros'], required: true},
    descripcion:{type: String, required: true},
    ubicacion: {type: String, required: true},
}, {timestamps: true});


const Producto = mongoose.model('producto', productShema);

module.exports = Producto;
