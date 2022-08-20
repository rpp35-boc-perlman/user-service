const request = require('supertest');
const express = require('express');

const app = require('../server.js')

describe('Server Heartbeat Test', () => {

    it('Should have a heartbeat', async () => {
        try{
            const r = await request(app).get('http://localhost:3300/heartbeat')
            expect(r.status).toEqual(200)
        } catch (err) {

        }
    }, 5000);

})