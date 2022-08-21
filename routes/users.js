// user service router
const express = require('express');
const router = express.Router();
const User = require('../lib/user');
const response = require('../lib/response.js');
const asyncHandler = require('../lib/asyncHandler');

const user = new User('user_id', 'users')


// User Crud Routes

// get all
router.get('/', asyncHandler( async (req, res, next) => {
    try {
        const result = await user.findAll()
        const r = response(200, 'success', result)
        res.status(r.status).json(r)
    } catch (err) {
        const r = response(err.status, err.message, [], err)
        res.status(r.status).json(r)
    }
}));

// get one
router.get('/:id', asyncHandler( async (req, res, next) => {
    const {id} = req.params
    try{
        const result = await user.findById(id)
        const r = response(200, 'success', result)
        res.json(r)
    } catch (err) {
        const r = response(err.status, err.message, [], err)
        res.status(response.status).json(r)
    }
}));

// create one
router.post('/', asyncHandler ( async (req, res, next) => {
    try {
        const {user_email, password, token = ''} = req.body
        const result = await user.create({user_email, password, token})
        const r = response(201, null, result)
        res.status(r.status).json(r)
    } catch(err){
        const r = response(err.status, err.message, [], err)
        res.status(r.status).json(r)
    }
}));

// update one
router.patch('/:id', asyncHandler( async (req, res, next) => {
    const {id} = req.params
    const {password} = req.body
    try{
        const result = await user.findByIdAndUpdate(id, {"password": password})
        const r = response(202, 'updated successful', result)
        res.status(r.status).json(r)
    } catch (err) {
        const r = response(500, err.message, [], err)
        res.status(r.status).json(r)
    }
}));

// delete one
router.delete('/:id', asyncHandler( async (req, res, next) => {
    const {id} = req.params
    try {
        const result = await user.findByIdAndDelete(id)
        const r = response(200, 'Delete Successful', result)
        res.status(r.status).json(r)
    } catch (err) {
        console.log(err)
        const r = response(500, err.message, [], err)
        res.status(500).json(r)
    }
}));


module.exports = router;

