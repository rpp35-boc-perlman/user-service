
const response = require('../lib/response');

describe('Response object generator', () => {
    it('Should be a function', () => {
        expect(typeof(response)).toBe('function')
    })
    it('Should be able to repsond with placeholder data', () => {
        const r = response()
        expect(r.status).toBe(200)
        expect(r.data).toEqual([])
        expect(r.message).toBe( "No message specified")
    })
    it('Should be able to take optional Error', () => {
        const r = response( 500, "Error", [], 'this is an error' )
        expect(r.error).toBe('this is an error')
    })
})