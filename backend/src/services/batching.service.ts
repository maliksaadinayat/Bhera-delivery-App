import { PrismaClient, OrderStatus } from '@prisma/client';
import { getDistance } from '../utils/haversine';

const prisma = new PrismaClient();

export const findBatchableOrders = async (orderId: string) => {
  const currentOrder = await prisma.order.findUnique({
    where: { id: orderId },
    include: { customer: true, restaurant: true }
  });

  if (!currentOrder) return [];

  // Find other pending/preparing orders from the same restaurant
  const candidateOrders = await prisma.order.findMany({
    where: {
      restaurantId: currentOrder.restaurantId,
      status: { in: [OrderStatus.PENDING, OrderStatus.ACCEPTED, OrderStatus.PREPARING] },
      id: { not: orderId },
      riderId: null // Not yet assigned to a rider
    },
    include: { customer: true }
  });

  // Filter orders where customers are within a 2km radius
  // (Assuming User model has lat/lng fields for this logic)
  const batchable = candidateOrders.filter(order => {
    // if (currentOrder.customer.lat && currentOrder.customer.lng && order.customer.lat && order.customer.lng) {
    //   return getDistance(currentOrder.customer.lat, currentOrder.customer.lng, order.customer.lat, order.customer.lng) <= 2;
    // }
    return false; // Default to false if no coordinates
  });

  return batchable;
};
