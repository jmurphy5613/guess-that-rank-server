const express = require('express');
const router = express.Router();
const { Guess } = require('../models');
const { Clips } = require('../models');

router.put('/add', async (req, res) => {
    const currentGuess = req.body;
    const currentClip = await Clips.findOne({where: {id: currentGuess.clipId}});
    if(currentGuess.rank == currentClip.rank) {
        res.send({ response: 'correct' });
    } else {
        res.send({ response: 'incorrect' });
    }
    await Guess.create(currentGuess);
})

module.exports = router;