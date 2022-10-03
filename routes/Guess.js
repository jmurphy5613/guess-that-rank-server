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

router.get('/guessed/:username/:game', async (req, res) => {
    const guesses = await Guess.findAll({ where: {user: req.params.username } });
    const totalGuesses = [];
    for(const guess of guesses) {
        const clip = await Clips.findOne({ where: { id: guess.clipId } });
        const currentGuess = {
            rank: guess.rank,
            correctRank: clip.rank
        }
        if(clip.game === req.params.game) {
            totalGuesses.push(currentGuess);
        }
    }
    res.send(totalGuesses)
});

router.get('/not-guessed-clips/:game/:username', async (req, res) => {
    const guesses = await Guess.findAll({ where: { user: req.params.username } });
    let gussesClipIds = [];
    for(let i = 0; i < guesses.length; i++) {
        gussesClipIds.push(guesses[i]);
        console.log('guessed clips: ', gussesClipIds.length)
    }
    let allClipIds = [];
    const clips = await Clips.findAll({ where: { game: req.params.game } });
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
        notGuessedClips.push(await Clips.findOne({where: {id: notGuessedClipIds[i], game: req.params.game}}));
    }
    res.send(notGuessedClips);
})

router.get('/guessed-clips/:game/:username', async (req, res) => {
    //get the clips that the user has guessed
    const guesses = await Guess.findAll({ where: { user: req.params.username } });
    let gussesClipIds = [];
    for(let i = 0; i < guesses.length; i++) {
        gussesClipIds.push(guesses[i]);
        console.log('guessed clips: ', gussesClipIds.length)
    }
    //get the object of the clips that have been guessed
    let guessedClips = [];
    for(let i = 0; i < gussesClipIds.length; i++) {
        guessedClips.push(await Clips.findOne({where: {id: gussesClipIds[i].clipId, game: req.params.game}}));
    }

    //remove all duplicates
    let uniqueGuessedClips = [];
    for(let i = 0; i < guessedClips.length; i++) {
        let found = false;
        for(let j = 0; j < uniqueGuessedClips.length; j++) {
            if(guessedClips[i].id == uniqueGuessedClips[j].id) {
                found = true;
            }
        }
        if(!found) {
            uniqueGuessedClips.push(guessedClips[i]);
        }
    }
    res.send(uniqueGuessedClips);

});

router.get('/has-already-gussed/:clipId/:user', async (req, res) => {
    const guess = await Guess.findOne({where: {clipId: req.params.clipId, user: req.params.user}});
    if(guess) {
        res.send({response: 'true'});
    } else {
        res.send({response: 'false'});
    }
});

router.get('/percent-correct/:clipId', async (req, res) => {
    const clips = await Clips.findAll({ where: { clipId: req.params.clipId } });
    let correctGuesses = 0;
    let totalGuesses = 0;
    for(let i = 0; i < clips.length; i++) {
        if(clips[i].isCorrect) correctGuesses++;
        totalGuesses++;
    }
    res.send({percent: (correctGuesses / totalGuesses) * 100});
});

router.get('/all-guesses/:username', async (req, res) => {
    const guesses = await Guess.findAll({ where: { user: req.params.username } });
    res.send(guesses);
})

module.exports = router;