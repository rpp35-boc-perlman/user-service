const express = require('express')

const router = express.Router()

/**
 * @function - generate a token and assign it to the user
 * @returns - user info and token
 * @param {string} email - email of user
 * @param {string} password - plain text password to be compared against stored password
 */
router.post('/login', (req, res, next) => {
    console.log(req)
    next()
})

/**
 * @function - terminate the provided users session
 * @returns - status code
 * @param {string} id - id of user
 */
router.post('/logout', (req, res, next) => {
    console.log(req)
    next()
})



module.exports = router