const express = require("express");
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pokemons', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));
app.use('/moves', require('./routes/moves'));
app.use('/trainers', require('./routes/trainers'));
app.use('/arenas', require('./routes/arenas'));
app.use('/items', require('./routes/items'));

app.listen(3000, () => {
    console.log('listening on localhost:3000');
});