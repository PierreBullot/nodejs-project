const express = require("express");
const router = express.Router();
const Move = require('../models/Move');

router.get('/', async (req, res) => {
    try {
        const moves = await Move.find();
        res.status(200).json(moves);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newMove = new Move(req.body);
        const moveRegistered = await newMove.save();
        res.status(200).json(moveRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const moves = await Move.findById(req.params.id);
        res.status(200).json(moves);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMove = await Move.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMove);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMove = await Move.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedMove);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;