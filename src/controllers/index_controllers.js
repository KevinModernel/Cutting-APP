import {Journey} from '../models/Journey.js'

export const show_landing = (req, res) => {
	res.render('landing');
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

		res.redirect('/showjourney');

	} catch (error) {
		return res.status(500).json({message: error.message});
	};
};


export const show_journey = async (req, res) => {
	try {
		const journeys = await Journey.findAll();
		res.send(journeys);
	} catch (e) {
		console.log(e);
	};
};
