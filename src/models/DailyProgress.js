const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const DailyProgress = sequelize.define('dailyProgresses', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: {
		type: DataTypes.DATEONLY
	},
	weight: {
		type: DataTypes.FLOAT
	}
})

module.exports = {DailyProgress}