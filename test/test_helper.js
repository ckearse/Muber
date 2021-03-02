/** @format */

const mongoose = require('mongoose');

before((done) => {
	mongoose.connect('mongodb://localhost/muber_test', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	mongoose.connection
		.once('open', () => {
			done();
		})
		.on('error', (error) => {
			console.warn('Warning: ', error);
		});
});

beforeEach((done) => {
	const { drivers } = mongoose.connection.collections;
	drivers
		.drop()
		.then(() => {
			Driver.createIndexes({
				'geometry.coordinates': '2dsphere',
			});
		})
		.then(() => done())
		.catch(() => done());
});
