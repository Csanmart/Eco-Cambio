const respuestas = require('../models/respuesta-models');
const comentarios =  require('../models/comentarios-models');
const usuarios = require('../../user-Service/models/user-models');


exports.respuesta = async (req, res) => {
    const { comentarioId, id_user, respuesta } = req.body;
    try {
        // validar comentario en Mongo
        const comentario = await comentarios.findById(comentarioId);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // validar usuario en SQL
        const usuario = await usuarios.findByPk(id_user);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // crear respuesta en Mongo
        const nuevaRespuesta = await respuestas.create({
            comentarioId,
            id_user,
            respuesta
        });

        res.status(201).json({
            message: 'Respuesta creada correctamente',
            data: nuevaRespuesta
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creando la respuesta',
            error: error.message
        });
    }
};


exports.allrepuestas = async(req, res)=>{
    const {id} = req.params;

    try {
        const mostrarRepuesta = await respuestas.find({comentarioId: id});

        const respuestaUsuario = await Promise.all(mostrarRepuesta.map(async(c)=>{
            const usuario = await usuarios.findByPk(c.id_user);
            return{
                ...c.toObject(),
                usuario: usuario ? usuario.nombre: "Usuario desconocido"
            };
        })
    );
    res.status(200).json(respuestaUsuario);
    } catch (error) {
        res.status(400).json({message: 'Erro mostrando las pespuestas'})
    }
}