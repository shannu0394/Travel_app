const request = require('supertest')
const app = require('./server')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        city: 'Arlon'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("city", "Arlon");
    expect(res.body).toHaveProperty("country");
    expect(res.body).toHaveProperty("icon");
    expect(res.body).toHaveProperty("img");
    expect(res.body).toHaveProperty("latitude");
    expect(res.body).toHaveProperty("longitude"); 
    expect(res.body).toHaveProperty("temperature");
  })
});
