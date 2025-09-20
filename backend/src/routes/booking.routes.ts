import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/auth.middleware";
import { notifyUser } from "../services/notification.service";

const prisma = new PrismaClient();
const router = Router();

// Create Booking (enthusiast books artist)
router.post("/", protect, async (req, res) => {
  try {
    const { artistId, date } = req.body;
    const userId = (req as any).userId;

    // Check artist exists and is actually an artist
    const artist = await prisma.user.findUnique({ where: { id: artistId } });
    if (!artist || !artist.isArtist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        artistId,
        date: new Date(date),
      },
      include: {
        artist: { select: { id: true, name: true, email: true } },
      },
    });
    
    res.status(201).json(booking);
    await notifyUser(artistId, `You have a new booking request for ${date}`);

  } catch (err) {
    res.status(500).json({ message: "Error creating booking", error: err });
  }
});

// Get current user's bookings
router.get("/my", protect, async (req, res) => {
  try {
    const userId = (req as any).userId;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        artist: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
});

// Get artist's appointments
router.get("/appointments", protect, async (req, res) => {
  try {
    const artistId = (req as any).userId;

    const artist = await prisma.user.findUnique({ where: { id: artistId } });
    if (!artist?.isArtist) {
      return res.status(403).json({ message: "Only artists can view appointments" });
    }

    const bookings = await prisma.booking.findMany({
      where: { artistId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments", error: err });
  }
});

// Update booking status (only artist can confirm/cancel/complete)
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const artistId = (req as any).userId;
    const { status } = req.body;

    const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.artistId !== artistId) {
      return res.status(403).json({ message: "Only the artist can update booking status" });
    }

    const updated = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
    });

    if (status === "CONFIRMED") {
      await notifyUser(booking.userId, "Your booking has been confirmed 🎉");
    } else if (status === "CANCELLED") {
  await notifyUser(booking.userId, "Your booking was cancelled ❌");
    } else if (status === "COMPLETED") {
      await notifyUser(booking.userId, "Your booking is marked as completed ✅");
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking status", error: err });
  }
});


export default router;