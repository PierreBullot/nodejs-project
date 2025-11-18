const express = require("express");
const router = express.Router();
const Arena = require('../models/Arena');

router.get('/', async (req, res) => {
    try {
        const arenas = await Arena.find();
        res.status(200).json(arenas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newArena = new Arena(req.body);
        const arenaRegistered = await newArena.save();
        res.status(200).json(arenaRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const arenas = await Arena.findById(req.params.id);
        res.status(200).json(arenas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedArena = await Arena.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArena);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedArena = await Arena.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedArena);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;