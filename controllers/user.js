'use strict'

let bcrypt = require('bcrypt-nodejs');
let User = require('../models/user');
let jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del api rest con Node y Mongo'
    });
}

function saveUser(req, res){
    let user = new User();

    let params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //encriptar contraseña y guardar dato
        bcrypt.hash(params.password, null, null, function(err, hash){
           user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    }else{
                        if(!userStored){
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        }else{
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            }else{
                res.status(200).send({
                    message: 'Rellena todos los campos'
                });
            }
        });
    }else{
        res.status(200).send({
            message: 'Introduce la contraseña'
        });
    }

}

function loginUser(req, res){
    let params = req.body;

    let email = params.email;
    let password = params.password;

    User.findOne({
        email: email.toLowerCase()
    },(err,user) => {
        if(err){
            res.status(500).send({
                message: 'Error en la peticion'
            });
        }else{
            if(!user){
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            }else{
                //comprobar contraseña
                bcrypt.compare(password, user.password, (err, check) =>{
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            }); 
                        }else{
                            res.status(200).send({
                                user
                            }); 
                        }
                    }else{
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse'
                        });
                    }
                });
            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};

