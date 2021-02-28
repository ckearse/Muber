/** @format */

const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
	it('handle GET request to /api', (done) => {
		request(app)
			.get('/api')
			.end((err, res) => {
				if (err) res.status(400).send(err);
				assert(res.body.hi === 'there');
				done();
			});
	});
});
