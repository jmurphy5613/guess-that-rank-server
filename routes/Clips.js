const express = require('express');
const router = express.Router();
const { Clips } = require('../models');

router.post('/add-clip', async(req, res) => {
    const clip = req.body;
    const clipInDb = await Clips.create(clip);
    res.send({ response: 'success', id: clipInDb.id });
});

router.get('/get-all/:game', async(req, res) => {
    const clips = await Clips.findAll({ where: { game: req.params.game } });
    res.send(clips);
}); 

router.get('/by-id/:id', async(req, res) => {
    const clip = await Clips.findOne({ where: { id: req.params.id } });
    res.send(clip);
});

module.exports = router;