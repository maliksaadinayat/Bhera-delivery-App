export const calculateSurgePrice = (basePrice: number) => {
  const currentHour = new Date().getHours();
  // Peak hours in Bhera: 12 PM - 2 PM (Lunch) and 7 PM - 9 PM (Dinner)
  if ((currentHour >= 12 && currentHour <= 14) || (currentHour >= 19 && currentHour <= 21)) {
    return basePrice * 0.2; // 20% surge pricing
  }
  return 0;
};
