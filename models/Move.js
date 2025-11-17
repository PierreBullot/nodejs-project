const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    name: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    description: String,
    power: Number,
    accuracy: Number
});

module.exports = mongoose.model('Move', moveSchema);