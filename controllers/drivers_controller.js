/** @format */
const Driver = require('./../models/driver');

module.exports = {
	index(req, res) {
		res.send({ message: '' });
	},
	create(req, res, next) {
		const driverProps = req.body;

		Driver.create(driverProps)
			.then((user) => {
				console.log(user);
				res.send(user);
			})
			.catch(next);
	},
	findAll(req, res, next) {
		console.log('FIND ALL');
		Driver.find()
			.then((drivers) => {
				res.send(drivers);
			})
			.catch(next);
	},
	read(req, res, next) {
		const { driverProps, updateProps } = req.body;
		const { id } = req.params;

		const driverQuery = id !== 'null' ? { _id: id } : driverProps;
		Driver.findOne(driverQuery)
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
					res.send({ updatedDriver });
				});
			})
			.catch(next);
	},
	delete(req, res, next) {
		const { driverProps, updateProps } = req.body;
		const { id } = req.params;

		const driverQuery = id !== 'null' ? { _id: id } : driverProps;

		Driver.findOneAndDelete(driverQuery)
			.then((deletedDriver) => {
				res.send({ deletedDriver });
			})
			.catch(next);
	},
};
