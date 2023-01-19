const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const Goal = sequelize.define('goals', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	bw: {
		type: DataTypes.FLOAT
	},
	bf: {
		type: DataTypes.FLOAT
	},	
	endDate: {
		type: DataTypes.DATEONLY
	},
})

module.exports = {Goal}
