// Separar funcion "calcs" para cada dato.
export const days = (startDate, endDate) => { // OK
	const days = (Date.parse(endDate)- Date.parse(startDate))/(8.64*10**7);
	return days
};

export const endBF = (startBodyWeight, startBodyFat, endBW) => {
	const endBF = startBodyWeight*(startBodyFat/100) - (startBodyWeight - endBW);
	return endBF
};

export const endBFPercentage = (endBW, endBF) => {
	const endBFPercentage = Math.floor((endBF / endBW) * 100);
	return endBFPercentage
};

export const deltaWeight = (startBodyWeight, endBW) => {
	const deltaWeight = startBodyWeight - endBW;
	return deltaWeight
};

export const dailyLoss = (deltaWeight, days) => {
	const dailyLoss = Math.round( (deltaWeight/days)*1000 ) / 1000; 
	return dailyLoss
};

export const weeklyLoss = (dailyLoss) => {
	const weeklyLoss = Math.round( (dailyLoss*7)*1000 ) / 1000;
	return weeklyLoss
};

export const weeklyDeficit = (weeklyLoss, ) => {
	const fatCalories = 5500;
	const weeklyDeficit = Math.floor(weeklyLoss*fatCalories);
	return 	weeklyDeficit
};

export const dailyVariation = (dailyProgress, weight) => {
	const dayBefore = dailyProgress.slice(-1);
	if (dayBefore == false) { // Primera iteracion dayBefore == [] == false
		return 0
	}
	const weightDayBefore = dayBefore[0].weight;
	const dailyVariation = Math.round( (weight - weightDayBefore)*1000 ) / 1000;

	return dailyVariation
};

export const goalDailyWeight = (journey, goal, days, dailyProgress) => {
	const initialWeight = journey.bodyWeight;
	const deltaW = deltaWeight(journey.bodyWeight, goal.bw);
	const dailyL = dailyLoss(deltaW, days)
	const quantityDays = dailyProgress.length;
	if (quantityDays == false) { // Primera iteracion quantityDays == 0 == false
		return journey.bodyWeight
	}
	const goalDailyWeight = Math.round( (initialWeight - dailyL*quantityDays)*100) / 100;
	return goalDailyWeight
};