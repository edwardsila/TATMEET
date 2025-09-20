import { Router } from "express";
import prisma from "../lib/prisma";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Create a chat between two users (if it doesn’t exist)
router.post("/", protect, async (req, res) => {
  try {
    const { userId } = req.body; // ID of the other user
    const authUserId = req.user.id;

    if (userId === authUserId) {
      return res.status(400).json({ message: "Cannot chat with yourself" });
    }

    // Check if chat already exists
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { user1Id: authUserId, user2Id: userId },
          { user1Id: userId, user2Id: authUserId },
        ],
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          user1Id: authUserId,
          user2Id: userId,
        },
      });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all chats for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const authUserId = req.user.id;

    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ user1Id: authUserId }, { user2Id: authUserId }],
      },
      include: {
        user1: true,
        user2: true,
        lastMessage: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single chat by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const chat = await prisma.chat.findUnique({
      where: { id },
      include: {
        user1: true,
        user2: true,
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;