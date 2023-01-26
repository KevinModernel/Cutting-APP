import { DataTypes } from 'sequelize'
import {sequelize} from '../database/database.js'

export const DailyProgress = sequelize.define('dailyProgresses', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	days:{
		type:DataTypes.STRING,
		allowNull: false,
	},
	weight: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	dailyVariation: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	goalWeight: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
}, {timestamps: false})
