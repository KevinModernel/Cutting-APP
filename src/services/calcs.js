export const subtractDays = (startDate, endDate) => {
	const days = (Date.parse(endDate)- Date.parse(startDate))/(8.64*10**7);
	return days
};

export const calculateEndBodyFat = (startBodyWeight, startBodyFat, endBodyWeight) => {
	const endBodyFat = startBodyWeight*(startBodyFat/100) - (startBodyWeight - endBodyWeight);
	return endBodyFat
};

export const calculateEndBodyFatPercentage = (endBodyWeight, endBodyFat) => {
	const endBodyFatPercentage = Math.floor((endBodyFat / endBodyWeight) * 100);
	return endBodyFatPercentage
};

export const subtractWeights = (startBodyWeight, endBodyWeight) => {
	const deltaWeight = startBodyWeight - endBodyWeight;
	return deltaWeight
};

export const calculateDailyLoss = (deltaWeight, days) => {
	const dailyLoss = Math.round( (deltaWeight/days)*1000 ) / 1000; 
	return dailyLoss
};

export const calculateWeeklyLoss = (dailyLoss) => {
	const weeklyLoss = Math.round( (dailyLoss*7)*1000 ) / 1000;
	return weeklyLoss
};

export const calculateWeeklyDeficit = (weeklyLoss) => {
	const fatCalories = 5500;
	const weeklyDeficit = Math.floor(weeklyLoss*fatCalories);
	return 	weeklyDeficit
};

export const calculateDailyVariation = (weightDayBefore, weightCurrentDay) => {
	const dailyVariation = Math.round( (weightCurrentDay - weightDayBefore)*1000 ) / 1000;
	return dailyVariation
};

export const CalculateDailyGoalWeight = (startBodyWeight, dailyLoss, daysPassed) => {
	const dailyGoalWeight = Math.round( (startBodyWeight - dailyLoss*daysPassed)*100) / 100;
	return dailyGoalWeight
};