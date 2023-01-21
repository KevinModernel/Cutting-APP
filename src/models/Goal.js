import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

export const Goal = sequelize.define('goals', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	bw: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	bf: {
		type: DataTypes.FLOAT,
		allowNull: false
	},	
	endDate: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
})
