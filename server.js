const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pokemons', require('./routes/pokemons'));

app.listen(3000, () => {
    console.log('listening on localhost:3000');
});