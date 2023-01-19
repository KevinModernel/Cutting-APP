const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	'cuttingapp',
	'postgres',
	'password',
	{
		host: 'localhost',
		dialect: 'postgres',
	}
);

module.exports = sequelize