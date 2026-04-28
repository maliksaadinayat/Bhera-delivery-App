import { PrismaClient, RiderStatus } from '@prisma/client';
import { getDistance } from '../utils/haversine';

const prisma = new PrismaClient();

export const findNearestRider = async (restaurantLat: number, restaurantLng: number) => {
  const availableRiders = await prisma.rider.findMany({
    where: {
      status: RiderStatus.AVAILABLE,
    },
    include: {
      user: true,
    },
  });

  if (availableRiders.length === 0) return null;

  let nearestRider = null;
  let minDistance = Infinity;

  for (const rider of availableRiders) {
    if (rider.currentLat && rider.currentLng) {
      const distance = getDistance(restaurantLat, restaurantLng, rider.currentLat, rider.currentLng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestRider = rider;
      }
    }
  }

  return nearestRider;
};
