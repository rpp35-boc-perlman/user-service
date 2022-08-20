// user service router
const express = require('express');
const router = express.Router();
const User = require('../lib/user');

const user = new User('user_id', 'users')

// User Crud Routes

// get all
router.get('/', (req, res, next) => {
    res.send('get all users');
});

// get one
router.get('/:id', (req, res, next) => {
    res.send('get one user');
});

// create one
router.post('/', async (req, res, next) => {
    try {
        const {user_email, password, token = ''} = req.body
        const r = await user.create({user_email, password, token})
        res.status(201).json( {message: "create one", result: r.rows[0]} );
    } catch(err){
        next(err)
    }
});

// update one
router.patch('/:id', (req, res, next) => {
    res.send('update one user');
});

// delete one
router.delete('/:id', (req, res, next) => {
    res.send('delete one user');
});


module.exports = router;

