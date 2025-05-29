const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
    it('should return an array of users without passwords', async () => {
        const res = await request(app).get('/users');
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
            expect(res.body[0]).not.toHaveProperty('password');
        }
    });
});

describe('GET /users/:id', () => {
    it('should return user by ID', async () => {
        const createRes = await request(app).post('/users').send({
            name: 'Test Get By ID',
            email: 'test@example.com',
            password: '12345678'
        });

        const userId = createRes.body.id;
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should return 404 for invalid ID', async () => {
        const res = await request(app).get('/users/invalid-id');
        expect(res.statusCode).toBe(404);
    });
});
