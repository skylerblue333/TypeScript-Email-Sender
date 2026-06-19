import request from 'supertest';
import app from '../src/index';

describe('TypeScript-Email-Sender', () => {
  it('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('POST /api/v1/send - valid email', async () => {
    const res = await request(app)
      .post('/api/v1/send')
      .send({ to: 'user@example.com', subject: 'Welcome', body: 'Hello!' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('sent');
  });

  it('POST /api/v1/send - invalid email', async () => {
    const res = await request(app)
      .post('/api/v1/send')
      .send({ to: 'not-an-email', subject: 'Test', body: 'Body' });
    expect(res.status).toBe(400);
  });

});
