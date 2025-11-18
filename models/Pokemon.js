const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    moves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Move'
    }],
    description: String,
    height: Number,
    weight: Number,
    sex: {
        type: String,
        enum: ['male', 'female', 'none', 'both'],
        default: 'both'
    },
    evolutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }]
});

module.exports = mongoose.model('Pokemon', pokemonSchema);