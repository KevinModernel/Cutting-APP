import { DataTypes } from 'sequelize'
import {sequelize} from '../database/database.js'
import { DailyProgress } from './DailyProgress.js'
import { Goal } from './Goal.js'

export const Journey = sequelize.define('journeys', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	journeyName: {
		type: DataTypes.STRING
	},
	bodyWeight: {
		type: DataTypes.FLOAT
	},
	bodyFat: {
		type: DataTypes.FLOAT
	},
	startDate: {
		type: DataTypes.DATEONLY
	},
}, {timestamps: false});

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
