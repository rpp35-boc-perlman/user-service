const Model = require('./model')
const bcrypt = require('bcrypt');


/**
 * @constructor
 * @param {string} primaryId - primary key of the table
 * @param {string} table - name of table
 * @param {instance} client - (only for testing) instance of pg client
 * @param {number} saltRounds - (optional) number of salt rounds
 */
class User extends Model{
    constructor(primaryId, table, client, saltRounds = 15){
        super(primaryId, table, client)
        this.saltRounds = saltRounds
    }

    /**
     * @function - takes a string and returns a hash (string)
     * @returns - string
     * @param {string} password - unhashed string
     */
    async hashPassword (password) {
       const hashedPassword = await bcrypt.hash(password, this.saltRounds)
       return hashedPassword
    }

    /**
     * @function - Checks if a password matches the hashed password
     * @returns - boolean
     * @param {string} password - original unhashed passowrd
     * @param {srting} hashedPassword - hashed password retrieved from the database
     */
    async verifyPassword (password, hash) {
        const result = await bcrypt.compare(password, hash)
        return result
    }

}


module.exports = User;