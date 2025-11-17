const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: String,
    active_pokemons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }],
    caught_pokemons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

module.exports = mongoose.model('Trainer', trainerSchema);