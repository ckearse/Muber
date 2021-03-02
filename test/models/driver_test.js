/** @format */

const mongoose = require('mongoose');
const assert = require('assert');

const Driver = mongoose.model('driver');

describe('Test Driver validation', () => {
	it('verify email required', (done) => {
		const testDriver = new Driver();
		const { message } = testDriver.validateSync().errors.email.properties;
		assert(message === 'Email is required.');
		done();
	});
	it('verify email format enforced', (done) => {
		const testDriver = new Driver({ email: 'test@' });
		const { message } = testDriver.validateSync().errors.email.properties;
		assert(message === 'Please enter a valid email address.');
		done();
	});
	it('verify correct email format accepted', (done) => {
		const testDriver = new Driver({ email: 'test@' });
		const { errors } = testDriver.validateSync().errors;
		assert(errors === undefined);
		done();
	});
});
