const express = require('express');
const router = express.Router(); 
const userControllers = require('../controllers/user-controllers');
const authMiddleware = require('../middelware/auth-middelware');


router.post('/registro', userControllers.Registro);
router.post('/login',userControllers.InicioSesion);
router.get('/usuarios/:id', userControllers.usuarioById);
router.put('/actualizar/:id', authMiddleware, userControllers.Actualizar);
router.post('/pedirPregunta', userControllers.pedirPregunta);
router.post('/solicitarRespuesta', userControllers.solicitarRepuesta);
router.put('/resetContrasena/:correo', userControllers.resetContrasena);


module.exports = router;