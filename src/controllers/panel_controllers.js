import { Journey } from '../models/Journey.js'
import { Goal } from '../models/Goal.js'
import { DailyProgress } from '../models/DailyProgress.js'
import { getTodayDate, 
	subtractDays, 
	calculateDailyVariation, 
	CalculateDailyGoalWeight, 
	subtractWeights, 
	calculateDailyLoss } from '../services/calcs.js'

export const show_journey = async (req, res) => {
	const { id } = req.params;
	let dailyProgress = '';
	let journey;
	let goal;
	
	// Find journey
	try {
		journey = await Journey.findOne({
			where: {
				id
			}
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	};
	// Find goal of this journey
	try {
		goal = await Goal.findOne({
			where: {
				journeyId: id
			}
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	};
	// Find dailyProgress of this journey
	try {
		dailyProgress = await DailyProgress.findAll({
		where: {
			journeyId: id
		}
		});
	} catch(error) {
		return res.status(500).json({ message: error.message });
	}

	// Get today date and subtract end date, to get the how many days until the end and display it in table.
	const todayDate = getTodayDate();
	let daysUntilEnd = subtractDays(todayDate, goal.endDate );

	res.render('journey', { journey, goal, dailyProgress, daysUntilEnd });
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

	let dayBeforeProgress = dailyProgress.slice(-1);
	let weightDayBefore;
	if (dayBeforeProgress == false) { // When dailyProgress is empty, dayBeforeProgress == [] == false.
		weightDayBefore = weight; // So that it'll return dailyVariation zero.
	} else { 
		weightDayBefore = dayBeforeProgress[0].weight;
	};

	const days = subtractDays(journey.startDate, goal.endDate);
	const dailyVariation = calculateDailyVariation(weightDayBefore, weight);

	const startBodyWeight = journey.bodyWeight;

	const deltaWeight = journey.bodyWeight - goal.bw;
	const dailyLoss = calculateDailyLoss(deltaWeight, days)
	const daysPassed = dailyProgress.length;


	const dailyGoalWeight = CalculateDailyGoalWeight(startBodyWeight, dailyLoss, daysPassed);

	try { // Stores a new day in DB 
		const newDay = await DailyProgress.create({
			date,
			days, // I think it´s not necessary, check it.
			weight,
			dailyVariation,
			goalWeight: dailyGoalWeight,
			journeyId,
		});

		res.redirect(`/panel/journeys/${journeyId}`);
	} catch (e) {
		console.log(e);
	}
};

export const delete_day = async (req, res) => {
	try {
		const journeyid= req.params.journeyid;
		const id = req.params.id; // day ID, not FK. you want to modify each day.
		await DailyProgress.destroy({
			where: {
				id,
			}
		});
		res.redirect(`/panel/journeys/${journeyid}`);
	} catch (error) {
			return res.status(500).json({ message: error.message });
	};
};