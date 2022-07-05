const express = require('express');
const router = express.Router();
const { Clips } = require('../models');

router.put('/add-clip', async(req, res) => {
    const clip = req.body;
    await Clips.create(clip);
    res.send({ response: 'success' });
})

module.exports = router;