const express = require('express');
const session = require('express-session')
const config = require('dotenv').config
const routeProtection = require('./middleware/routeProtection')
const morgan = require('morgan')
const cors = require('cors');

const app = express()

if (process.env.NODE_ENV !== 'test') config();

app.use(morgan('dev'));

app.use(express.json())
app.use(cors());

app.set('trust proxy', true)

const sessionConfig = {
    name: 'CalentodoSession',
    secret: process.env.SESSION_SECRET,
    domain: 'example.com',
    saveUninitialized: false,
    proxy: true,
    rolling: true,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 60000 * 60
    }
}

app.use(session(sessionConfig))

app.get('/api/heartbeat', (req,res,next) => {
    res.status(200).send('up');
})


// routers
app.use('/api/users', require('./routes/users'));
app.use('/api/service', require('./routes/auth'));
app.use('/', routeProtection, require('./routes/proxy'));

// 404 handler
app.use((req,res) => {
    res.status(404).send(`Not Found ${req.path}`)
})

// catch all error handlerœ
app.use((err, req, res, next) => {
    console.log('Error: '.red, err.message)
    res.status(500).json({
        status: 500,
        message: "An Error Occured",
        error: err
    })
})

module.exports = app