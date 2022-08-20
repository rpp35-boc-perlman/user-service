// test for the user data model and methods
const Model = require('../lib/model');
const User = require('../lib/user');
const {Client} = require('pg');

// test database
const client = new Client({
    host: 'calentodo-testdatabase.clsa9ofihsho.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: 'password',
    port: 5432
})



describe('User Model Unit Tests', () => {
    let user = new User('user_id', 'users', client)

    const testData = {
        user_email: 'test@test.com',
        password: 'test'
    }

    it('Should be a class', () => {
        expect(user).toBeInstanceOf(Model)
    })
    it('Should have required global methods', () => {
        expect(typeof(user.create)).toBe('function')
        expect(typeof(user.find)).toBe('function')
        expect(typeof(user.findAll)).toBe('function')
        expect(typeof(user.findByIdAndUpdate)).toBe('function')
        expect(typeof(user.findAndDelete)).toBe('function')
    })
    it('Should have required utility methods', () => {
        expect(typeof(user.getColumns)).toBe('function')
        expect(typeof(user.getValues)).toBe('function')
        expect(typeof(user.generatePlaceholders)).toBe('function')
    })
    it('getColumns should return requested columns from data provided', () => {
        expect(user.getColumns(testData)).toEqual(['user_email', 'password'])
    })
    it('getValues should reutn requested values from data provided', () => {
        expect(user.getValues(testData)).toEqual(['test@test.com', 'test'])
    })
    it('generatePlacehoders should return currect number of placeholder for data provided', () => {
        const r = user.generatePlaceholders(testData)
        expect(r.length).toEqual(2)
        expect(r).toEqual(['$1', "$2"])
    })
    it('Should be able to hash a password', async () => {
        const testHash = await user.hashPassword(testData.password)
        expect(testHash).not.toEqual(testData.password)
    })
    it('Should be able to verify a hashed password', async() => {
        const testHash = await user.hashPassword(testData.password)
        const r1 = await user.verifyPassword(testData.password, testHash)
        expect(r1).toBe(true)
    }, 10000)
    it('Should be able to fail a incoreect password',  async () => {
        const testHash = await user.hashPassword(testData.password)
        const r2 = await user.verifyPassword('1234', testHash)
        expect(r2).not.toBe(true)
    }, 10000)


})