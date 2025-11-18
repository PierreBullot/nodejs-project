const express = require("express");
const router = express.Router();
const Trainer = require('../models/Trainer');

router.get('/', async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTrainer = new Trainer(req.body);
        const trainerRegistered = await newTrainer.save();
        res.status(200).json(trainerRegistered);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const trainers = await Trainer.findById(req.params.id);
        res.status(200).json(trainers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTrainer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTrainer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;