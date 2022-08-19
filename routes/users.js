// user service router

const express = require('express');
const router = express.Router();
const user = require('../lib/user');

router.get('/', (req, res, next) => {
    res.send('users');
});


module.exports = router;

