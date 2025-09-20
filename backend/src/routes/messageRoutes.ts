import { Router } from "express";
import prisma from "../lib/prisma";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Send a new message
router.post("/", protect, async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const authUserId = req.user.id;

    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: authUserId,
        text,
      },
    });

    // Update chat’s lastMessage + increment unreadCount
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        lastMessageId: message.id,
        unreadCount: { increment: 1 },
        updatedAt: new Date(),
      },
    });

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages in a chat
router.get("/:chatId", protect, async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { sender: true },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;