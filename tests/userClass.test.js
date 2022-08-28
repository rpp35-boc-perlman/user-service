// test for the user data model and methods
const Model = require('../lib/model');
const User = require('../lib/user');
const {Client} = require('pg');
const colorGenerator = require('../lib/colorGenerator');

// test database
const client = new Client({
    host: 'calentodo-testdatabase.clsa9ofihsho.us-east-2.rds.amazonaws.com',
    user: 'postgres',
    password: 'password',
    port: 5432
})



describe('User Model Unit Tests', () => {

    const testData = {
        user_email: 'test@test.com',
        password: 'test',
        color: '#ff0000'
    }

    it('Should be a class', () => {
        expect(User).toBeInstanceOf(Model)
    })
    it('Should have required global methods', () => {
        expect(typeof(User.create)).toBe('function')
        expect(typeof(User.find)).toBe('function')
        expect(typeof(User.findAll)).toBe('function')
        expect(typeof(User.findByIdAndUpdate)).toBe('function')
        expect(typeof(User.findByIdAndDelete)).toBe('function')
    })
    it('Should have required utility methods', () => {
        expect(typeof(User.getColumns)).toBe('function')
        expect(typeof(User.getValues)).toBe('function')
        expect(typeof(User.generatePlaceholders)).toBe('function')
    })
    it('getColumns should return requested columns from data provided', () => {
        expect(User.getColumns(testData)).toEqual(['user_email', 'password', 'color'])
    })
    it('getValues should reutn requested values from data provided', () => {
        expect(User.getValues(testData)).toEqual(['test@test.com', 'test', '#ff0000'])
    })
    it('generatePlacehoders should return currect number of placeholder for data provided', () => {
        const r = User.generatePlaceholders(testData)
        expect(r.length).toEqual(3)
        expect(r).toEqual(['$1', "$2", "$3"])
    })
    it('Should be able to hash a password', async () => {
        const testHash = await User.hashPassword(testData.password)
        expect(testHash).not.toEqual(testData.password)
    })
    it('Should be able to verify a hashed password', async() => {
        const testHash = await User.hashPassword(testData.password)
        const r1 = await User.verifyPassword(testData.password, testHash)
        expect(r1).toBe(true)
    }, 10000)
    it('Should be able to fail a incoreect password',  async () => {
        const testHash = await User.hashPassword(testData.password)
        const r2 = await User.verifyPassword('1234', testHash)
        expect(r2).not.toBe(true)
    }, 10000)
    it('Should be able to generate a random valid hex color', () => {
        const r = colorGenerator()
        expect(r).toMatch(/#[a-f0-9]{6}/)
    })

})