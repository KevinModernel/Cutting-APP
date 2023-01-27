import {Journey} from '../models/Journey.js';
import {Goal} from '../models/Goal.js';

export const show_createGoal = async (req, res) => {
	const { id } = req.params; // Journey id is used to assign foreign key to new goal.
	res.render('goal', { id });
};

export const create_goal = async (req, res) => {
	const {bw, bf, endDate, journeyId} = req.body;

	try { // Stores new Goal in the DB and redirects to follow up panel.
		const newGoal = await Goal.create({
			bw,
			bf,
			endDate,
			journeyId,
		});

		res.redirect(`/panel/journeys/${journeyId}`);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

