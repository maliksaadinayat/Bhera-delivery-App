import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendNotification = async (userId: string, title: string, body: string) => {
  console.log(`Sending notification to user ${userId}: ${title} - ${body}`);
  
  // Save to database
  await prisma.notification.create({
    data: {
      userId,
      title,
      body
    }
  });

  // In a real app, this would use Firebase Admin SDK
  // const user = await prisma.user.findUnique({ where: { id: userId } });
  // if (user && user.fcmToken) {
  //   admin.messaging().sendToDevice(user.fcmToken, { notification: { title, body } });
  // }
};
