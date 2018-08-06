'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'secret_password';

exports.ensureAuth = function(req, res, next){
    let payload;
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'La peticion no tiene la cabecera de autenticacion'
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(404).send({
                message: 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'Token no valido'
        });
    }

    req.user = payload;

    next();
}