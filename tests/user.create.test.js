const request = require('supertest');
const app = require('../app');
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

beforeEach(async () => {
    await fs.writeFile(dataPath, '[]'); // reset users
});

describe('POST /users', () => {
    it('should create a new user and return without password', async () => {
        const res = await request(app).post('/users').send({
            name: 'Test',
            email: 'test@example.com',
            password: '12345678'
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).not.toHaveProperty('password');
        expect(res.body.balance).toBe(100);
    });

    it('should return 400 for missing fields', async () => {
        const res = await request(app).post('/users').send({ email: 'no-name' });
        expect(res.statusCode).toBe(400);
    });
});
