import {Journey} from '../models/Journey.js'
import {Goal} from '../models/Goal.js'
import { DailyProgress } from '../models/DailyProgress.js'
import { calcs } from '../services/calcs.js'

export const show_landing = async (req, res) => {
	try {
		const journeys = await Journey.findAll();
		res.render('landing', { journeys });
	} catch (e) {
		console.log(e);
	};
	
};

export const create_journey = async (req, res) => {

	const {journeyName, bodyWeight, bodyFat, startDate} = req.body;

	try {
		const newJourney = await Journey.create({ //newProject: objeto que representa la fila que se ha guardado en la tabla
			journeyName,
			bodyWeight,
			bodyFat,
			startDate,
			});	

		res.redirect('/');

	} catch (error) {
		return res.status(500).json({message: error.message});
	};
};

export const show_journey = async (req, res) => {
	try {
		let stats = '';
		let dailyProgress = '';
		const { id } = req.params;
		const journey = await Journey.findOne({
			where: {
				id
			}
		});

		const goal = await Goal.findOne({
			where: {
				journeyId: id
			}
		});

		try {
			stats = calcs(journey.bodyWeight, journey.bodyFat, journey.startDate, goal.bw, goal.endDate)
		} catch(e) {
			console.log(e);
		}

		try {
			dailyProgress = await DailyProgress.findAll();
		} catch(e) {
			console.log(e);
		}

		res.render('journey', { journey, goal, stats, dailyProgress });

	} catch (e) {
		console.log(e);
	};
};

export const create_goal = async (req, res) => {
	const {bw, bf, endDate, journeyId} = req.body;
	console.log("journeyID: " + journeyId);
	try {
		const newGoal = await Goal.create({
			bw,
			bf,
			endDate,
			journeyId,
		});

		res.redirect(`/journeys/${journeyId}`);
	} catch (e) {
		console.log(e);
	}
};

export const store_measure = async (req, res) => {
	const {date, weight, journeyId} = req.body;
	console.log(date, weight, journeyId);
	try {
		const newDay = await DailyProgress.create({
			date,
			weight,
			journeyId,
		});

		res.redirect(`/journeys/${journeyId}`);
	} catch (e) {
		console.log(e);
	}
};