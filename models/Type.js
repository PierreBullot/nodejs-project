const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
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