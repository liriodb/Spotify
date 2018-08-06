'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SongSchema = Schema({
    number: String,
    name: String,
    duration: Number,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album'} 
});

module.exports = mongoose.model('Song', SongSchema);
