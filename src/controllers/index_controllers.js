const show_landing = (req, res) => {
	res.render('landing');
};

const create_journey = (req, res) => {
	console.log('hi');
	res.redirect('/');
};


module.exports = { show_landing, create_journey }
