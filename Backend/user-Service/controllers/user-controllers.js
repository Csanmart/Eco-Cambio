const {hashContrasena, compareContrasena} = require('../utils/hash')
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');
const { hash } = require('bcrypt');


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
        const handleContrasena = await hashContrasena(contrasena)
        
        const registro = await userModel.create({
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            contrasena: handleContrasena
        });
        
        
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

        const isValidPassword = compareContrasena(contrasena, login.contrasena);

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
            telefono: login.telefono
        }});
        
    }catch(error){
        res.status(400).json({message: 'Error iniciando sesion'});
    }
};


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
