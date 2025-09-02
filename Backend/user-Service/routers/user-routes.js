const express = require('express');
const router = express.Router(); 
const userControllers = require('../controllers/user-controllers');
const authMiddleware = require('../middelware/auth-middelware');

router.post('/registro' ,userControllers.Registro);
router.post('/login', userControllers.InicioSesion);
router.put('/actualizar/:id', authMiddleware, userControllers.Actualizar);


module.exports = router;