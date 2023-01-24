import {Journey} from '../models/Journey.js'
import {Goal} from '../models/Goal.js'
import { DailyProgress } from '../models/DailyProgress.js'
import { days, dailyVariation, goalDailyWeight, dailyLoss } from '../services/calcs.js'

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

		// Gets all dailyProgress
		try {
			dailyProgress = await DailyProgress.findAll({
			where: {
				journeyId: id
			}
			});
		} catch(e) {
			console.log(e);
		}

		// Gets today date and rest journey.endDate to get the days until end of journey
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		today = yyyy + '-' + mm + '-' + dd;
		console.log(today)
		goal.endDate = '2023-01-30';
		console.log(goal.endDate);

		let daysUntilEnd = ( Date.parse(goal.endDate) - Date.parse(today) ) / (8.64*10**7);
		console.log(daysUntilEnd);
		// Got it.

		// Gets perdida diario objetivo.
		let deltaWeight = journey.bodyWeight - goal.bw;
		console.log(deltaWeight);
		let days = ( Date.parse(goal.endDate) - Date.parse(journey.startDate) ) / (8.64*10**7);
		console.log(days) 
		let dailyDelta = dailyLoss(deltaWeight, days);
		console.log(dailyDelta);
		// Got it.

		let aditionalData = {
			daysUntilEnd,
			dailyDelta,
		}

		res.render('journey', { journey, goal, dailyProgress, aditionalData });

	} catch (e) {
		console.log(e);
	};
};

export const create_goal = async (req, res) => {
	const {bw, bf, endDate, journeyId} = req.body;

	try { // Stores new Goal in the DB.
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
	const dailyProgress = await DailyProgress.findAll(
		{ 
			where: {
				journeyId: journeyId.toString()
			}
		}, 
		{
			attributes: ['weight']
		} 
	);

	const journey = await Journey.findOne({
		where: {
			id: journeyId.toString()
		}
	});

	const goal = await Goal.findOne({
		where: {
			journeyId: journeyId.toString()
		}
	});

	const Ddays = days(journey.startDate, goal.endDate); // Ok
	const DdailyVariation = dailyVariation(dailyProgress, weight);
	const DgoalDailyWeight = goalDailyWeight(journey, goal, Ddays, dailyProgress)

	try { // Stores a new day in DB (row in table)
		const newDay = await DailyProgress.create({
			date,
			days: Ddays,
			weight,
			dailyVariation: DdailyVariation,
			goalWeight: DgoalDailyWeight,
			journeyId,
		});

		res.redirect(`/journeys/${journeyId}`);
	} catch (e) {
		console.log(e);
	}
};

export const edit_day = async (req, res) => {
	try {
		const { id } = req.params; // Atento es el ID del day, no la FK. Vos queres editar cada day.
		const {date, weight} = req.body;

		const day = await DailyProgress.findByPk(id);
		day.date = date;
		day.weight = weight;


	} catch (error) {
			return res.status(500).json({ message: error.message });
	};
};

export const delete_day = async (req, res) => {
	try {
		console.log("controller delete day")
		const { id } = req.params; // Atento es el ID del day, no la FK. Vos queres editar cada day.
		await DailyProgress.destroy({
			where: {
				id,
			}
		});
		res.redirect(`/journeys/1`); // Refactorizar cuando saques opcion de journeys
	} catch (error) {
			return res.status(500).json({ message: error.message });
	};
};