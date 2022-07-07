const express = require('express');
const router = express.Router();
const { Guess } = require('../models');
const { Clips } = require('../models');

router.post('/add', async (req, res) => {
    const currentGuess = req.body;
    const currentClip = await Clips.findOne({where: {id: currentGuess.clipId}});
    if(currentGuess.rank == currentClip.rank) {
        res.send({ response: 'correct' });
    } else {
        res.send({ response: 'incorrect', correctRank: currentClip.rank });
    }
    await Guess.create(currentGuess);
});

router.get('/guessed/:username', async (req, res) => {
    const clips = await Clips.findAll({ where: {user: req.params.username} });
    res.send(clips);
});

module.exports = router;