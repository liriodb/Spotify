'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// cargar rutas
let user_routes = require('./routes/user');
let artist_routes = require('./routes/artist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras HTTP

// rutas base
app.use('/api', user_routes);  
app.use('/api', artist_routes);  

module.exports = app;