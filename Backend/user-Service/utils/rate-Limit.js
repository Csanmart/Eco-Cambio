const rateLimit = require('express-rate-limit');

const generarLimite = rateLimit({
    windowMs: 1000,
    max: 5,
    message: 'Demasiadas solicitudes en este momento',
    standarHeaders: true,
    legacyHeaders: false
})

const strictLimiter = rateLimit({
  windowMs: 1000, // 1 segundo
  max: 3, // Solo 3 intentos de login por segundo por IP
  message: 'Demasiados intentos de login. Por favor, espera un momento.',
  handler: (req, res) => { // Personalizar la respuesta de error
    res.status(429).json({
      error: 'Demasiados intentos.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000) // Tiempo para reintentar
    });
  }
});


module.exports = {
    generarLimite,
    strictLimiter
}