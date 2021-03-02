/** @format */
const Driver = require('./../models/driver');

module.exports = {
	index(req, res, next) {
		const { lat, lng } = req.query;
		Driver.aggregate([
			{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [parseFloat(lng), parseFloat(lat)],
					},
					distanceField: 'distance',
					spherical: true,
					maxDistance: 20000,
				},
			},
		])
			.then((drivers) => {
				res.send(drivers);
			})
			.catch(next);
	},
	create(req, res, next) {
		const driverProps = req.body;
		Driver.create(driverProps)
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	},
	findAll(req, res, next) {
		Driver.find()
			.then((drivers) => {
				res.send(drivers);
			})
			.catch(next);
	},
	read(req, res, next) {
		const { id } = req.params;

		Driver.findById(id)
			.then((driver) => {
				res.send(driver);
			})
			.catch(next);
	},
	update(req, res, next) {
		const { driverProps, updateProps } = req.body;
		const { id } = req.params;

		const driverQuery = id !== 'null' ? { _id: id } : driverProps;

		Driver.findOneAndUpdate(driverQuery, updateProps)
			.then((driver) => {
				Driver.findById(driver._id).then((updatedDriver) => {
					res.send(updatedDriver);
				});
			})
			.catch(next);
	},
	delete(req, res, next) {
		const { driverProps } = req.body;
		const { id } = req.params;

		const driverQuery = id !== 'null' ? { _id: id } : driverProps;

		Driver.findOneAndDelete(driverQuery)
			.then((deletedDriver) => {
				res.send(deletedDriver);
			})
			.catch(next);
	},
};
