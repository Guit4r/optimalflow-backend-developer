const request = require('supertest');
const app = require('../app');
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

beforeEach(async () => {
    await fs.writeFile(dataPath, '[]'); // reset users
});

describe('POST /login', () => {
    it('should login successfully and return a token', async () => {
        await request(app).post('/users').send({
            name: 'Test',
            email: 'test@example.com',
            password: '12345678'
        });

        const res = await request(app).post('/login').send({
            email: 'test@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toHaveProperty('message', 'Login successful');
        expect(res.body.token).toHaveProperty('token');
        expect(typeof res.body.token.token).toBe('string');
    });

    it('should return 401 for invalid credentials', async () => {
        const res = await request(app).post('/login').send({
            email: 'test@example.com',
            password: 'wrongpass'
        });

        expect(res.statusCode).toBe(401);
    });
});
