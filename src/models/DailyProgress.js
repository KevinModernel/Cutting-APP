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
	weight: {
		type: DataTypes.FLOAT,
		allowNull: false
	}
})
