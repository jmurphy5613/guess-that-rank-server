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
    const clips = await Guess.findAll({ where: {user: req.params.username} });
    res.send(clips);
});

router.get('/not-guessed/:username', async (req, res) => {
    const guesses = await Guess.findAll({ where: { user: req.params.username } });
    let gussesClipIds = [];
    for(let i = 0; i < guesses.length; i++) {
        gussesClipIds.push(guesses[i]);
        console.log('guessed clips: ', gussesClipIds.length)
    }
    let allClipIds = [];
    const clips = await Clips.findAll();
    for(let i = 0; i < clips.length; i++) {
        allClipIds.push(clips[i].id);
    }
    console.log('number of clips: ', allClipIds.length);

    let notGuessedClipIds = [];
    for(let i = 0; i < allClipIds.length; i++) {
        let found = false;
        for(let j = 0; j < gussesClipIds.length; j++) {
            if(allClipIds[i] == gussesClipIds[j].clipId) {
                found = true;
            }
        }
        if(!found) {
            notGuessedClipIds.push(allClipIds[i]);
        }
    }
    //get the objects for the not guessed clips
    let notGuessedClips = [];
    for(let i = 0; i < notGuessedClipIds.length; i++) {
        notGuessedClips.push(await Clips.findOne({where: {id: notGuessedClipIds[i]}}));
    }
    res.send(notGuessedClips);
})

module.exports = router;