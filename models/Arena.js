const mongoose = require('mongoose');

const arenaSchema = new mongoose.Schema({
    name: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'
    }]
});

module.exports = mongoose.model('Arena', arenaSchema);