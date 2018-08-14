'use strict'

let express = require('express');
let ArtistController = require('../controllers/artist');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.get('/artist', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);

module.exports = api;