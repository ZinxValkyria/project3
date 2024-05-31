const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    test('It should respond with status 200 and render index page', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome to the MediaVerse Engine!');
    });
});

describe('GET /movies', () => {
    test('It should respond with status 200 and render movies page', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.text).toContain('movies');
    });
});

describe('GET /api/character', () => {
    test('It should respond with character data', async () => {
        const response = await request(app).get('/api/character?character=Iron Man');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Iron Man');
        // Add more assertions as needed...
    });

    test('It should handle errors gracefully', async () => {
        // Mock the axios get method to simulate an error
        jest.spyOn(require('axios'), 'get').mockRejectedValue(new Error('Axios error'));

        const response = await request(app).get('/api/character?character=Spider-Man');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
});
