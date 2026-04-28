import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const trackEarnings = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { restaurant: true, rider: true }
  });

  if (!order) return;

  const totalAmount = order.totalAmount;
  const platformCommission = totalAmount * (order.restaurant.commission / 100);
  const restaurantPayout = totalAmount - platformCommission;

  // Track Platform Commission
  await prisma.transaction.create({
    data: {
      userId: 'SYSTEM', // System account
      orderId,
      amount: platformCommission,
      type: 'COMMISSION'
    }
  });

  // Track Restaurant Payout
  await prisma.transaction.create({
    data: {
      userId: order.restaurant.userId,
      orderId,
      amount: restaurantPayout,
      type: 'PAYOUT'
    }
  });

  // Track Rider Earnings
  if (order.riderId && order.rider) {
    const riderFee = 50; // Example delivery fee payout to rider
    await prisma.transaction.create({
      data: {
        userId: order.rider.userId,
        orderId,
        amount: riderFee,
        type: 'EARNING'
      }
    });
    
    await prisma.rider.update({
      where: { id: order.riderId },
      data: { earnings: { increment: riderFee } }
    });
  }
};
