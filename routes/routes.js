/** @format */
const driver_controller = require('./../controllers/drivers_controller');

module.exports = (app) => {
	app.get('/api', driver_controller.index);
	app.get('/api/drivers', driver_controller.findAll);
	app.get('/api/drivers/:id', driver_controller.read);
	app.post('/api/drivers', driver_controller.create);
	app.put('/api/drivers/:id', driver_controller.update);
	app.delete('/api/drivers/:id', driver_controller.delete);
};
