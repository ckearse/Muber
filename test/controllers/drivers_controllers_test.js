/** @format */

const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('get all drivers within 20km of coordinate', (done) => {
		const losAngelesDriver = new Driver({
			email: 'la@test.com',
			geometry: {
				coordinates: [-118.24368, 34.05223],
			},
		});
		const phillyDriver = new Driver({
			email: 'philly@test.com',
			geometry: {
				coordinates: [-75.16379, 39.95233],
			},
		});

		Promise.all([losAngelesDriver.save(), phillyDriver.save()]).then(
			(result) => {
				assert(result.length === 2);

				request(app)
					.get('/api?lng=-118.24368&lat=34')
					.end((error, res) => {
						const drivers = res.body;
						assert(drivers.length === 1);
						assert(drivers[0].email === 'la@test.com');
						done();
					});
			}
		);
	});

	it('post to /api/drivers creates a new driver', (done) => {
		Driver.estimatedDocumentCount().then((count) => {
			request(app)
				.post('/api/drivers')
				.send({ email: 'test@test.com' })
				.end((error, res) => {
					const driver = res.body;
					Driver.estimatedDocumentCount().then((newCount) => {
						assert(count + 1 === newCount);
						assert(driver.email === 'test@test.com');
						done();
					});
				});
		});
	});
	it('get to /api/drivers returns list of all drivers', (done) => {
		const testDriver1 = new Driver({ email: 'chris@test.com' });
		const testDriver2 = new Driver({ email: 'jess@test.com' });
		const testDriver3 = new Driver({ email: 'jennie@test.com' });

		Promise.all([
			testDriver1.save(),
			testDriver2.save(),
			testDriver3.save(),
		]).then(() => {
			request(app)
				.get('/api/drivers')
				.end((error, res) => {
					const drivers = res.body;
					assert(drivers.length === 3);
					assert(drivers[0].email === 'chris@test.com');
					done();
				});
		});
	});
	it('get to /api/driver returns queried driver', (done) => {
		new Driver({
			email: 'chris@test.com',
		})
			.save()
			.then((driver) => {
				request(app)
					.get(`/api/drivers/${driver._id}`)
					.end((error, res) => {
						assert(res.body.email === 'chris@test.com');
						done();
					});
			});
	});
	it('put to /api/driver/:id updates specified driver', (done) => {
		const testDriver = new Driver({ email: 'test@test.com' });

		testDriver.save().then((driver) => {
			request(app)
				.put(`/api/drivers/${driver._id}`)
				.send({
					updateProps: {
						driving: true,
					},
				})
				.end((error, res) => {
					const updatedDriver = res.body;
					assert(updatedDriver.email === 'test@test.com');
					assert(updatedDriver.driving === true);
					done();
				});
		});
	});
	it('delete to /api/driver/:id deletes the specified driver', (done) => {
		const testDriver = new Driver({ email: 'test@test.com' });

		testDriver.save().then((driver) => {
			request(app)
				.delete(`/api/drivers/${driver._id}`)
				.end((error, res) => {
					const deletedDriver = res.body;
					assert(deletedDriver.email === 'test@test.com');
					Driver.estimatedDocumentCount().then((newCount) => {
						assert(newCount === 0);
						done();
					});
				});
		});
	});
});
