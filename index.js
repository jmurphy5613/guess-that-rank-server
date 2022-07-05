const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const db = require('./models');

const clipRouter = require('./routes/Clips');
app.use('/clips', clipRouter);

db.sequelize.sync().then(
    app.listen(port, () => {
        console.log('LISTEN');
    })
);