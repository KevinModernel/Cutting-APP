const sequelize = require('./src/database/database.js');
require('dotenv').config();
const app = require('./app.js');
const Journey = require('./src/models/Journey.js');

// innitialize Express Server
const PORT = process.env.PORT || 3000;
try{
	app.listen(PORT);
	console.log("Express running on port: " + PORT);
} catch(e) {
	console.error('Unable to stablish connection to server: ', e);
};

// Model Sync
async function main() {
	try{
		await sequelize.sync({force: false});
		// await sequelize.authenticate(); // DB Ok
		console.log('Connection has been established successfully.');
	} catch (e) {
		console.error('unable to connecto to the DB: ', e);
	}
};
main();