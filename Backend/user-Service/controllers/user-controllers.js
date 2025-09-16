const {hashContrasena, compareContrasena, hashRespuesta, compareRespuesta} = require('../utils/hash')
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');


// Registro
exports.Registro = async (req, res) => {
    const { nombre, correo, telefono, contrasena, pregunta, respuesta } = req.body;

    // Regex
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const regexTelefono = /^(3\d{9})$/;

    // Validaciones
    if (!nombre || !correo || !telefono || !contrasena || !pregunta || !respuesta) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    } else if (!regexTelefono.test(telefono)) {
        return res
            .status(400)
            .json({ message: "El número de teléfono debe empezar por 3 y tener 10 dígitos" });
    } else if (!regexEmail.test(correo)) {
        return res.status(400).json({ message: "El correo no tiene un formato válido" });
    }

    try {
        // Hashear datos sensibles
        const respuestaHash = await hashRespuesta(respuesta);
        const handleContrasena = await hashContrasena(contrasena);

        // Guardar en BD
        const registro = await userModel.create({
            nombre,
            correo,
            telefono,
            contrasena: handleContrasena,
            pregunta,
            respuesta: respuestaHash,
        });

        // Respuesta exitosa
        res.status(201).json({
            message: "Usuario registrado correctamente",
            usuario: {
                id_user: registro.id_user,
                nombre: registro.nombre,
                correo: registro.correo,
                telefono: registro.telefono,
            },
        });
    } catch (error) {
        // Manejo específico para el error de unicidad
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "El correo electrónico ya se encuentra registrado." });
        }
        
        console.error("❌ Error en Registro:", error);
        return res.status(500).json({
            message: "Error creando el usuario",
        });
    }
};

//Login 
exports.InicioSesion = async(req, res) =>{
    const {correo, contrasena} = req.body;
    if(!correo || !contrasena){
        res.status(500).json({message: 'Todos los campos debe de estar llenos'})
    }
    try{
        const login = await userModel.findOne({where: {correo}});
        if(!login) return res.status(500).json({message: 'Usuarios no encontrado'});

        const isValidPassword = await compareContrasena(contrasena, login.contrasena);

        if(!isValidPassword){
            return res.status(402).json({Error: 'Credenciales no coinciden'})
        }

        const createToken = jwt.sign(
            {id_user:login.id_user}, "SSD", {expiresIn: "2h"}
        );

        

        res.status(200).json({message: 'Iniciando sesion...', createToken,login:{
            id_user: login.id_user,
            nombre: login.nombre,
            correo: login.correo,
            telefono: login.telefono,
        }});
        
    }catch(error){
        res.status(400).json({message: 'Error iniciando sesion'});
    }
};



//Usario por id

exports.usuarioById = async(req, res)=>{
    const {id} = req.params;
    try{
        const usuario = await userModel.findByPk(id);
        
        if(!usuario)return res.status(400).json({message: 'No se encuentra estos usuarios'});
        
        res.status(200).json({message: 'Usuario por id: ', usuario});
    
    }catch(error){
        res.status(400).json({message: 'Error sacando los datos...'});
    }
}



//Actulizar 
exports.Actualizar = async(req, res)=>{
    const {id} = req.params;
    const {nombre} = req.body; 
    try{
        const actualizar = await userModel.findByPk(id);
        if(!actualizar){
            return res.status(404).json({message: 'No se encuentra el usuario'})
        }

        if (req.user.id_user !== parseInt(id)) {
            return res.status(403).json({ message: "No autorizado para actualizar este usuario" });
        }

        actualizar.nombre = nombre || actualizar.nombre;
        await actualizar.save();

        res.status(200).json({ message: "Usuario actualizado correctamente", actualizar });
    }catch(error){
        res.status(400).json({message: 'Error actualizando el usuario'})
    }
};




//Pedir preguntas
exports.pedirPregunta = async(req, res)=>{
    const {correo} = req.body;
    try{
        const usuario = await userModel.findOne({where: {correo}});
        if(!usuario) return res.status(404).json({
            message: 'Error encontrando el usuario'
        })

        res.json({pregunta: usuario.pregunta});
        
    }catch(error){
        res.status(400).json({
            message: 'No se puede actualizar la contrasena',
            data: error
        })
    } 
};

//Solicitar la respuesta 
exports.solicitarRepuesta = async(req, res)=>{
    const {correo, respuesta} = req.body;

    try{
        const usuario = await userModel.findOne({where: {correo}});

        if(!usuario) return res.status(500).json({
            message: 'Error tomando los datos.'
        });

        const isvalidate = await compareRespuesta(respuesta, usuario.respuesta);

        if (!isvalidate) {
        return res.status(400).json({ message: "Respuesta incorrecta" });
        }


        res.status(200).json({message: 'Respuesta correcta', data: usuario})
    }catch(error){
        res.status(400).json({message: 'Error actualizando contraseña'})
    }
};


exports.resetContrasena = async (req, res) => {
  const { correo } = req.params;
  const { contrasena } = req.body;

  console.log("Correo recibido:", correo);
  console.log("Body recibido:", req.body);

  try {
    const usuario = await userModel.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 👇 Hashear la nueva contraseña
    const nuevaContrasenaHash = await hashContrasena(contrasena);
    console.log("Contraseña hasheada:", nuevaContrasenaHash);

    usuario.contrasena = nuevaContrasenaHash;

    await usuario.save();

    res.status(200).json({
      message: "Contraseña restablecida correctamente",
      usuario: {
        id_user: usuario.id_user,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono,
      },
    });
  } catch (error) {
    console.error("Error en resetContrasena:", error);
    res.status(400).json({ message: "Error restableciendo la contraseña" });
  }
};