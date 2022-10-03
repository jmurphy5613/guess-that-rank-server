const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const db = require('./models');

const clipRouter = require('./routes/Clips');
app.use('/clips', clipRouter);

const guessRouter = require('./routes/Guess');
app.use('/guess', guessRouter);

db.sequelize.sync().then(
    app.listen(process.env.PORT, () => {
        console.log('LISTENN!!!');
    })
);