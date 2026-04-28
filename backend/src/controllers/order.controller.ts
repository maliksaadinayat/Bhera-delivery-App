import { Request, Response } from 'express';
import { PrismaClient, OrderStatus } from '@prisma/client';
import { sendNotification } from '../services/notification.service';
import { findNearestRider } from '../services/dispatch.service';

const prisma = new PrismaClient();

export const createOrder = async (req: any, res: Response) => {
  const { restaurantId, items, totalAmount, paymentMethod } = req.body;
  const customerId = req.user.id;

  try {
    const order = await prisma.order.create({
      data: {
        customerId,
        restaurantId,
        totalAmount,
        paymentMethod,
        orderItems: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    await sendNotification(customerId, 'Order Placed', 'Your order has been placed successfully.');
    
    // Notify Restaurant
    const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
    if (restaurant) {
      await sendNotification(restaurant.userId, 'New Order', `You have a new order: ${order.id}`);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrderStatus = async (req: any, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    await sendNotification(order.customerId, 'Order Status Updated', `Your order is now ${status}`);

    if (status === OrderStatus.READY_FOR_PICKUP) {
      // Trigger Auto-Dispatch
      const restaurant = await prisma.restaurant.findUnique({ where: { id: order.restaurantId } });
      if (restaurant && restaurant.lat && restaurant.lng) {
        const nearestRider = await findNearestRider(restaurant.lat, restaurant.lng);
        if (nearestRider) {
          await prisma.order.update({
            where: { id: orderId },
            data: { riderId: nearestRider.id }
          });
          await sendNotification(nearestRider.userId, 'New Delivery Available', `Pick up order from ${restaurant.name}`);
        }
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};
