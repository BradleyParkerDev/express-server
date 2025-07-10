import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../server/src/app.js';

describe('GET /', () => {
	it('responds with Hello, World!', async () => {
		const res = await (request(app) as any).get('/');

		expect(res.statusCode).toBe(200);
		expect(res.text).toContain('Hello, World');
	});
});
