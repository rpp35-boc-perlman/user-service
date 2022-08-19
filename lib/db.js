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
    console.log('trying to connecto to database')
    client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    client.connect(err => {
        if(err) {
            console.log(err);
        } else {
            console.log('connected to database'.blue);
        }
    });

} 

module.exports = client;