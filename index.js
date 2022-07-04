const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

const db = require('./models');

db.sequelize.sync().then(
    app.listen(port, () => {
        console.log('LISTEN');
    })
);