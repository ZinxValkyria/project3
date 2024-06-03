const request = require('supertest');
const app = require('../app'); // Import the app
let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on http://localhost:3000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

describe('GET /api/character', () => {
  test('It should respond with character data', async () => {
    const response = await request(app).get('/api/character?character=Iron Man');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Iron Man');
  });

  test('It should handle errors gracefully', async () => {
    jest.mock('axios');
    const axios = require('axios');
    axios.get.mockRejectedValue(new Error('Axios error'));

    const response = await request(app).get('/api/character?character=?');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });
});
