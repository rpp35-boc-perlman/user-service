// starting the server
const config = require('dotenv').config;

config()
const port = process.env.PORT || 3300;

const app = require('./server')

app.listen(port, (err) => {
    if(process.env.ENV === 'PROD' || process.env.ENV === 'DEV'){
        console.log(`User Service is running on ${port}`)
    }
})