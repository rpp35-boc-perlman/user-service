const express = require('express');
const config = require('dotenv').config;

config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())

app.get('/heartbeat', (req,res,next) => {
    res.status(200).send('up');
})

app.listen(port, (err) => {
    console.log(process.env.ENV)
    if(process.env.ENV === 'PROD' || process.env.ENV === 'DEV'){
        console.log(`User Service is running on ${port}`)
    }
})

// export the app for testing
module.exports = app