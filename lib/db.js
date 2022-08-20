const {Client} = require('pg');
const colors = require('colors');
const config = require('dotenv').config;

// create a postgres client and connect to the database
let client = null

// stop env from loading in during testing
if(process.env.NODE_ENV !== 'test'){
    config()
}
if(process.env.ENV === 'PROD' || process.env.ENV === 'DEV') {
    console.log('Attempting Database Connection...'.yellow)
    client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_URL,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    client.connect(err => {
        if(err) {
            console.log('error connecting to DB'.red)
            console.log(err);
        } else {
            console.log('connected to database'.blue);
        }
    });

}

module.exports = client;