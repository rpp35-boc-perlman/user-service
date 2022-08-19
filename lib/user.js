const Model = require('./model')

class User extends Model{
    constructor(){
        super('user_id', 'users')
    }
}

const user = new User();

module.exports = user;