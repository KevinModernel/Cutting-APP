const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');
const { DailyProgress } = require('./DailyProgress.js');
const { Goal } = require('./Goal.js');

const Journey = sequelize.define('journeys', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING
	},
	bw: {
		type: DataTypes.FLOAT
	},
	bf: {
		type: DataTypes.FLOAT
	},
	dailyAct: {
		type: DataTypes.STRING
	},
	startDate: {
		type: DataTypes.DATEONLY
	},
})

Journey.hasMany(DailyProgress, {
	foreignKey: 'journeyId',
	sourceKey: 'id'
});

DailyProgress.belongsTo(Journey, {
	foreignKey: 'journeyId',
	target: 'id'
});

Journey.hasOne(Goal, {
	foreignKey: 'journeyId',
	target: 'id'
})

module.exports = Journey