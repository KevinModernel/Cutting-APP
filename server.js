require('dotenv').config();
const app = require('./app.js');

// innitialize Express Server
const PORT = process.env.PORT || 3000;
try{
	app.listen(PORT);
	console.log("Express running on port: " + PORT);
} catch(e) {
	console.error('Unable to stablish connection to server: ', e);
};

