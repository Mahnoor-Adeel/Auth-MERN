const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthRouter = require('./Routes/AuthRouter.js');
require('dotenv').config();
require('./Models/db');

app.use(bodyParser.json());
app.use(cors());
app.get('/ping', cors(), (req,res) => {
    console.log('bkufv4f');
    res.send('PONGbiu');
});




app.use('/auth', AuthRouter);
app.listen(3001, () => {
    console.log("Server is running.");
});