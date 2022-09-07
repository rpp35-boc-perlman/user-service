const express = require('express')
const router = express.Router()
const asyncHandler = require('../middleware/asyncHandler');
const response = require('../lib/response');

const User = require('../lib/user');

/**
 * @function - generate a token and assign it to the user
 * @returns - user info and token
 * @param {string} email - email of user
 * @param {string} password - plain text password to be compared against stored password
 */
router.post('/login', asyncHandler( async (req, res, next) => {
    try{
        const {user_email, password} = req.body
        // look up the user
        const u = await User.findByEmail(user_email);
        // compare the users password to the stored password
        const bool = await User.verifyPassword(password, u.password)

        let r = ''

        if(bool){
            req.session.loggedIn = true
            req.session.user = {id: u.user_id}
            await req.session.save();
            r = response(200, 'Welcome', u);
        } else {
            r = response(401, 'Incorrect Credentials', [])
        }

        res.status(r.status).json(r)
    } catch (err) {
        next(err)
    }
}));

/**
 * @function - terminate the provided users session
 * @returns - status code
 * @param {string} id - id of user
 */
router.post('/logout', (req, res, next) => {
    // destroy the user session on logout
    try{
        const {user_email} = req.body
        req.session.destroy()
        const r = response(200, 'You have been logged out', []);
        res.status(r.status).json(r);
    } catch (err) {
        next(err)
    }
})



module.exports = router