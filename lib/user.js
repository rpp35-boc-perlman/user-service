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
     * @function - creates a new user with a hashed password
     * @returns - the created user object
     * @param {obj} data - object containing user data
     */
    // override super method
    async create(data) {
        try{
            const {user_email, password} = data
            // replace the users password with a more secure verion
            const newObj = {
                "user_email": user_email,
                "password": await this.hashPassword(password),
                "token": ''
            }
            // do normal create stuff
            return super.create(newObj)
        } catch(err) {
            console.log( err )
            return err
        }
    }

    /**
     * @function - takes a string and returns a hash (string)
     * @returns - string
     * @param {string} password - unhashed string
     */
    async hashPassword (password) {
       const hashedPassword = await bcrypt.hash(String(password), this.saltRounds)
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