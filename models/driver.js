/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
	type: {
		type: String,
		default: 'Point',
	},
	coordinates: {
		type: [Number],
		index: '2dsphere',
	},
});

const DriverSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required.'],
		validate: {
			validator: (email) => {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(email);
			},
			message: 'Please enter a valid email address.',
		},
	},
	driving: {
		type: Boolean,
		default: false,
	},
	geometry: PointSchema,
});

DriverSchema.index({ geometry: '2dsphere' });

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
