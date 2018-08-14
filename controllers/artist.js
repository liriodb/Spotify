'use strict'

let path = require('path');
let fs = require('fs');

let Artist = require('../models/artist');
let Album = require('../models/album');
let Song = require('../models/song');

function getArtist(req, res){
    res.status(200).send({
        message: 'Metodo artist'
    });
}

function saveArtist(req, res){
    let artist = new Artist();

    let params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({
                message: 'Error al guardar el artista'
            });
        }else{
            if(!artistStored){
                res.status(404).send({
                    message: 'El artista no ha sido guardado'
                });
            }else{
                res.status(200).send({
                    artist: artistStored
                });
            }
        }
    });
}

module.exports = {
    getArtist,
    saveArtist
}