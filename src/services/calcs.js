export const calcs = (startBodyWeight, startBodyFat, startDate, endBW, endDate) => {
	const fatCalories = 5500; // Kcal in one kg of fat.

	const days = (Date.parse(endDate)- Date.parse(startDate))/(8.64*10**7);
	console.log("\ndays: " + days);

	const endBF = startBodyWeight*(startBodyFat/100) - (startBodyWeight - endBW);
	console.log("endBF: " + endBF);

	const endBFPercentage = Math.floor((endBF / endBW) * 100);
	console.log("endBF % : " + endBFPercentage);

	const deltaWeight = startBodyWeight - endBW;
	console.log("delta weigth: " + deltaWeight);

	const dailyLoss = Math.round( (deltaWeight/days)*1000 ) / 1000;
	console.log(dailyLoss)

	const weeklyLoss = Math.round( (dailyLoss*7)*1000 ) / 1000;
	console.log(weeklyLoss);

	const weeklyDeficit = Math.floor(weeklyLoss*fatCalories);
	console.log(weeklyDeficit);

	const stats = {
		days,
		endBF,
		endBFPercentage,
		deltaWeight,
		dailyLoss,
		weeklyLoss,
		weeklyDeficit
	}

	return stats;
}
