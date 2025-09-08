const productsModels = require('../models/products-models');
const {delay} = require('../utils/delay')

exports.allProducts = async(req, res)=>{
    try{
        const producto = await productsModels.find();
        if((await producto).length == 0){
            res.status(500).json({message:"No hay productos que mostrar"})
        }
        res.status(200).json({message: 'Todos los productos', data: producto})
    }catch(error){
        res.status(400).json({message: 'Error tomando todos los datos...', error})
    }
};

exports.getProductoById = async(req, res)=>{
    const {id} = req.params;
    try {
        const productos =await productsModels.findById(id); 
        if(!productos) return res.status(500).json({message: 'Producto no encontrado'});
        await delay(2000)
        res.status(200).json({message: 'Producto por id: ', data: productos})
    } catch (error) {
        res.status(400).json({message: 'Error tomando producto por id: ', error})
    }
};

exports.createProduct = async(req, res)=>{
    const {imagen, nombre, precio, tipo, categoria, descripcion, ubicacion} = req.body;
    

    if(!imagen || !nombre || !tipo || !categoria || !descripcion || !ubicacion){
        res.status(500).json({message: 'Todos los campos estan vacios'})
    }

    try {
        const producto = await productsModels.create(req.body);
        res.status(201).json({message: 'Producto creado', data: producto})
    } catch (error) {
        res.status(400).json({message: 'Error creando el producto...', error})
    }
};

exports.actualizarProducto = async(req, res)=>{
    const {id} = req.params;
    const {imagen, nombre, precio, tipo, categoria, descripcion, ubicacion} = req.body;

    if(!imagen || !nombre || !precio ||!tipo || !categoria || !descripcion || !ubicacion){
        res.status(500).json({message: 'Todos los campos son obligatorios'})
    }
    try{
        const productos = await productsModels.findByIdAndUpdate(id, req.body, {new: true});
        if(!productos) return res.status(500).json({message: 'No se encuentra los productos'})
        res.status(200).json({message: 'Producto actualizado...', productos});
    }catch(error){
        res.status(400).json({message: 'Error actualizando los productos..', error})
    }
};

exports.elimarProducto = async(req, res)=>{
    const {id} =  req.params;
    try {
        const productos = await productsModels.findByIdAndDelete(id);
        if(!productos) return res.status(500).json({message: 'No se encuentra este producto'});
        res.status(200).json({message: 'Producto borrado', productos});
    } catch (error) {
        res.status(400).json({message: 'Error eliminando el producto', error})
    }

}

