/** @format */

const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Driver = mongoose.model('driver');

before((done) => {
	mongoose.connection.collections.drivers.drop();
	done();
});

describe('Drivers controller', () => {
	it('post to /api/drivers creates a new driver', (done) => {
		Driver.count().then((count) => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com' })
				.end((error, res) => {
					Driver.count().then((newCount) => {
						assert(count + 1 === newCount);
						done();
					});
				});
		});
	});
});
