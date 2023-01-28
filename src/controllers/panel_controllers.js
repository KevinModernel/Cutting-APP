import { Journey } from '../models/Journey.js'
import { Goal } from '../models/Goal.js'
import { DailyProgress } from '../models/DailyProgress.js'
import { subtractDays, calculateDailyVariation, CalculateDailyGoalWeight, subtractWeights, calculateDailyLoss } from '../services/calcs.js'

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
		let daysUntilEnd = ( Date.parse(goal.endDate) - Date.parse(today) ) / (8.64*10**7);

		// Gets daily weight loss goal.
		let deltaWeight = journey.bodyWeight - goal.bw;
		let days = ( Date.parse(goal.endDate) - Date.parse(journey.startDate) ) / (8.64*10**7); 
		let dailyDelta = calculateDailyLoss(deltaWeight, days);

		let aditionalData = {
			daysUntilEnd,
			dailyDelta,
		}

		res.render('journey', { journey, goal, dailyProgress, aditionalData });

	} catch (e) {
		console.log(e);
	};
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

// Function not used. There is no route for this.
export const edit_day = async (req, res) => {
	try {
		const { id } = req.params; // day ID, not FK. you want to modify each day.
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