import {Journey} from '../models/Journey.js'
import {Goal} from '../models/Goal.js'
import { DailyProgress } from '../models/DailyProgress.js'

export const show_landing = async (req, res) => {
	try {
		const journeys = await Journey.findAll();
		res.render('landing', { journeys } );
	} catch (e) {
		console.log(e);
	};
};

export const create_journey = async (req, res) => {

	const {journeyName, bodyWeight, bodyFat, startDate} = req.body;

	try {
		const newJourney = await Journey.create({
			journeyName,
			bodyWeight,
			bodyFat,
			startDate,
			});

		res.redirect(`/goals/goal/${newJourney.id}`);

	} catch (error) {
		return res.status(500).json({message: error.message});
	};
};