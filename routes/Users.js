const express = require('express');
const router = express.Router();
const { User } = require('../models')

router.post('/add-display-name', async (req, res) => {
    const currentUser = req.body;
    const user = await User.findOne({where: {username: currentUser.username}});
    const user2 = await User.findOne({where: {nickname: currentUser.nickname}});
    if(!user && !user2) {
        await User.create(currentUser);
    } else {
        res.send({response: 'username already exists'});
    }
});


module.exports = router;
