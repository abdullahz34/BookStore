import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index.js'; // Update the path accordingly
import { mongoDBURL } from "../config.js";

// This is the test suite for the server connection (integration testing)
describe('Server Connection', () => {
    beforeAll(async() => {
        await mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async() => {
        await mongoose.disconnect();
    });

    it('should connect to the server', async() => {
        const response = await request(app).get('/');
        expect(response.status).toBe(234); // Update with your expected status code
    });
});