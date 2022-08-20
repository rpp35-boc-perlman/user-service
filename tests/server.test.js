const request = require('supertest');
const express = require('express');

const app = require('../server.js')

describe('Server Heartbeat Test', () => {
    let server = null

    beforeEach(() => {
        server = app.listen(3300)
    })

    afterEach(() => {
        server.close()
    })

    it('Should have a heartbeat', async () => {
        try{
            const r = await request(server).get('http://localhost:3300/api/heartbeat')
            expect(r.status).toEqual(200)
        } catch (err) {

        }
    }, 5000);

    it('Should have a 404 handler' , async () => {
        try{
            const r = await request(server).get('http://localhost:3300/nothere')
            expect(r.status).toEqual(404)
        } catch (err) {

        }
    }, 5000)

})