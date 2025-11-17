const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokemon');
    console.log('Connected to MongoDB pokemon database');
    } catch (err) {
    console.error('Error connecting to MongoDB pokemon database:', err);
    }
};

module.exports = connectDB;