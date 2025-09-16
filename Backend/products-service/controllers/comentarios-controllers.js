const Comentario = require('../models/comentarios-models'); // 👈 Mongo
const Producto = require('../models/products-models');      // 👈 Mongo
const Usuario = require('../../user-Service/models/user-models'); // 👈 Sequelize

// Crear comentario
exports.comentario = async (req, res) => {
    const { productoId, id_user, comentario } = req.body; // 👈 minúscula

    try {
        // Validar producto en Mongo
        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

        // Validar usuario en MySQL
        const usuario = await Usuario.findByPk(id_user);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Crear comentario en Mongo
        const nuevoComentario = await Comentario.create({
            productoId,
            id_user,
            comentario
        });

        res.status(200).json({ message: 'Comentario creado', nuevoComentario });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creando comentario', error });
    }
};

// Listar comentarios de un producto
exports.Allcomentarios = async (req, res) => {
    const { id } = req.params; // id del producto

    try {
        const mostrarComentario = await Comentario.find({ productoId: id });

        // Adjuntar datos de usuario desde MySQL
        const comentarioUsuario = await Promise.all(
            mostrarComentario.map(async (c) => {
                const usuario = await Usuario.findByPk(c.id_user); // 👈 corregido
                return {
                    ...c.toObject(),
                    usuario: usuario ? usuario.nombre : "usuario desconocido"
                };
            })
        );

        res.status(200).json(comentarioUsuario);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error tomando los comentarios', error });
    }
};
