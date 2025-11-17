const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/users', (req, res) => {
    res.send('Liste des utilisateurs');
});

app.get('/user/:id', (req, res) => {
    res.send(`Utilisateur avec id : ${req.params.id}`);
});

app.post('/user', (req, res) => {
    res.send(`creation de l'utilisateur: ${req.params.id}`);
});

app.put('/user/:id', (req, res) => {
    res.send(`modification de l'utilisateur: ${req.params.id}`);
});

app.delete('/user/:id', (req, res) => {
    res.send(`suppression de l'utilisateur: ${req.params.id}`);
});

app.listen(3000, () => {
    console.log('listening on localhost:3000');
});