'use strict'

let mongoose = require('mongoose');
let app = require('./app.js');
let port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/proyecto', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('La conexión a la base de datos esta funcionando correctamente');

        app.listen(port, function(){
            console.log('Servidor del api rest de musica esta escuchando en http://localhost:' + port);
        });
    }
});