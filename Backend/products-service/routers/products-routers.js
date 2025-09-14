const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products-controllers');


router.get('/',(req, res)=>{
    res.send('Hola mundo')
} )
router.get('/products', productControllers.allProducts);
router.get('/products/:id', productControllers.getProductoById);
router.post('/crear', productControllers.createProduct);
router.put('/products/:id', productControllers.actualizarProducto);
router.delete('/products/:id', productControllers.elimarProducto);

module.exports = router