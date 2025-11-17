const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String
});

module.exports = mongoose.model('Item', itemSchema);