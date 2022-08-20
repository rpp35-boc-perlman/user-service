const express = require('express');

const app = express()

app.use(express.json())

app.get('/api/heartbeat', (req,res,next) => {
    res.status(200).send('up');
})

// routers
app.use('/api/users', require('./routes/users'));


// 404 handler
app.use((req,res) => {
    res.status(404).send('Not Found')
})

// catch all error handler
app.use((err, req, res, next) => {
    console.log('Uncaught Error'.red)
    res.status(500).json({
        status: 500,
        message: "Uncaught error",
        error: err.message
    })
})

module.exports = app