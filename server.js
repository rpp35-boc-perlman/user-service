const express = require('express');

const app = express()

app.use(express.json())

app.get('/heartbeat', (req,res,next) => {
    res.status(200).send('up');
})

// routers
app.use('/api/users', require('./routes/users'));

// catch all error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: "uncaught error",
        error: err.message
    })
})

module.exports = app