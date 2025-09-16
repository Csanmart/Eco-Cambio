const express = require('express');
const router = express.Router();
const comentariosControllers = require('../controllers/comentarios-controllers');
const repuestaController = require('../controllers/respuesta-controllers');

router.post('/Comentar', comentariosControllers.comentario);
router.post('/respuesta', repuestaController.respuesta);
router.get('/respuestas/:id', repuestaController.allrepuestas);
router.get('/Comentarios/:id', comentariosControllers.Allcomentarios);

module.exports = router;


