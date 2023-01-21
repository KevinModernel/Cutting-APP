import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
	'cuttingapp',
	'postgres',
	'password',
	{
		host: 'localhost',
		dialect: 'postgres',
	}
);

