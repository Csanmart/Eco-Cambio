const { json } = require('sequelize');
const userModel = require('../models/user-models');

const jwt = require('jsonwebtoken');
const { UPDATE } = require('sequelize/lib/query-types');

//Registro

exports.Registro = async(req, res)=>{

    const {nombre, correo, telefono, contrasena} = req.body;
    //Regex 
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const regexTelefono =  /^(3\d{9})$/
    //Condicional
    if(!nombre || !correo || !telefono || !contrasena){
        return res.status(500)
    }else if(!regexTelefono.test(telefono)){
        return res.status(500).json({Message: 'Recuerda que el numero debe empezar por 300'})
    }else if(!regexEmail.test(correo)){
        return res.status(500).json({message: 'No coinciden con un el correo'})
    }
    try {
        const registro = await userModel.create(req.body);
        console.log(res)
        res.status(201).json(registro); 
    } catch (error) {
        console.log(res);
        return res.status(400).json({message:'Error creando el usuario', error});
    }
};

//Login 


exports.InicioSesion = async(req, res)=>{
    const {correo, contrasena} = req.body;
    if(!correo || !contrasena){
        res.status(500).json({message: 'Todos los campos debe de estar llenos'})
    }
    try{
        const login = await userModel.findOne({where: {correo}});
        if(!login) return res.status(500).json({message: 'Usuarios no encontrado'});

        if(contrasena !== login.contrasena){
            return  res.status(500).json({message: 'No coinciden las credenciales'});
        }

        const createToken = jwt.sign(
            {id_user:login.id_user}, "SSD", {expiresIn: "2h"}
        );

        res.status(200).json({message: 'Iniciando sesion...', createToken,login:{
            id_user: login.id_user,
            nombre: login.nombre,
            correo: login.correo,
            telefono: login.telefono
        }})
        
    }catch(error){
        res.status(400).json({message: 'Error iniciando sesion'})
    }
};


exports.Actualizar = async(req, res)=>{
    const {id} = req.params;
    const {nombre, correo, telefono, contrasena} = req.body; 
    try{
        const actualizar = await userModel.findByPk(id);
        if(!actualizar){
            return res.status(404).json({message: 'No se encuentra el usuario'})
        }

        if (req.user.id_user !== parseInt(id)) {
            return res.status(403).json({ message: "No autorizado para actualizar este usuario" });
        }

        actualizar.nombre = nombre || actualizar.nombre;
        actualizar.correo = correo || actualizar.correo;
        actualizar.contrasena = contrasena || actualizar.contrasena
        actualizar.telefono = telefono || actualizar.telefono;

        await actualizar.save();

        res.status(200).json({ message: "Usuario actualizado correctamente", actualizar });
    }catch(error){
        res.status(400).json({message: 'Error actualizando el usuario'})
    }
};
