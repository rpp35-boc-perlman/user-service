const express = require('express');
const config = require('dotenv').config;

config()

const app = express()


app.use(express.json())

app.get('/heartbeat', (req,res,next) => {
    res.status(200).send('up');
})




module.exports = app