import prisma from "../lib/prisma";
import { io } from "../server"; // import socket.io server

export const notifyUser = async (userId: string, message: string) => {
  const notification = await prisma.notification.create({
    data: { userId, message },
  });

  // Push in real-time
  io.to(userId).emit("notification", notification);

  return notification;
};