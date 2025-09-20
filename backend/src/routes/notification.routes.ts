import { Router } from "express";
import prisma from "../lib/prisma";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Get all notifications for logged in user
router.get("/", protect, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", error: err });
  }
});

// Mark as read
router.patch("/:id/read", protect, async (req, res) => {
  try {
    const userId = (req as any).userId;

    const notif = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notif || notif.userId !== userId) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { read: true },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating notification", error: err });
  }
});

export default router;
