import {Journey} from '../models/Journey.js';
import {Goal} from '../models/Goal.js';
import { calculateEndBodyFat, calculateEndBodyFatPercentage, subtractDays, calculateDailyLoss } from '../services/calcs.js'


export const show_createGoal = async (req, res) => {
	const { id } = req.params; // Journey id is used to assign foreign key to new goal.
	res.render('goal', { id });
};

export const create_goal = async (req, res) => {
	const {endBodyWeight, endDate, journeyId} = req.body;
	let journey;
	let goal;
	// Find journey
	try {
		journey = await Journey.findOne({
			where: {
				id: journeyId,
			}
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	};	

	// Get daily weight loss goal.
	let deltaWeight = journey.bodyWeight - endBodyWeight;
	const days = subtractDays(journey.startDate, endDate);
	const dailyLoss = calculateDailyLoss(deltaWeight, days);

	// Calculate final body fat %
	const startBodyWeight = journey.bodyWeight;
	const startBodyFat = journey.bodyFat;
	const endBodyFat = calculateEndBodyFat(startBodyWeight, startBodyFat, endBodyWeight);
	const endBodyFatPercentage = calculateEndBodyFatPercentage(endBodyWeight, endBodyFat);

	try { // Stores new Goal in the DB and redirects to follow up panel.
		const newGoal = await Goal.create({
			bw: endBodyWeight,
			bf: endBodyFatPercentage,
			dailyLoss,
			endDate,
			journeyId,
		});

		res.redirect(`/panel/journeys/${journeyId}`);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

