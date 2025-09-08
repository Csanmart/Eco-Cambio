const express = require('express');
const router = express.Router(); 
const userControllers = require('../controllers/user-controllers');
const authMiddleware = require('../middelware/auth-middelware');
const riteLimit = require('../utils/rate-Limit')


router.get('/', (req, res)=>{
    res.send('hola mundo')
})
router.post('/registro', riteLimit.strictLimiter ,userControllers.Registro);
router.post('/login',riteLimit.strictLimiter ,userControllers.InicioSesion);
router.put('/actualizar/:id', authMiddleware, userControllers.Actualizar);


module.exports = router;