const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: String,
    weaknesses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    resistances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }]
});

module.exports = mongoose.model('Type', typeSchema);