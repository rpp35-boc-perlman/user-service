const request = require('supertest');
const express = require('express');

const app = require('../server')

describe('Server Heartbeat Test', () => {

    afterAll( async () => {
        app.close()
    })

    it('Should have a heartbeat', () => {
        request(app)
            .get('http://localhost:3300/heartbeat')
            .expect(200)
    }, 10000)

})