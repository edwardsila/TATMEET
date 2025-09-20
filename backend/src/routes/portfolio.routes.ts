import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();
const router = Router();

// Create Portfolio (only artists)
router.post("/", protect, async (req, res) => {
  try {
    const { title, bio } = req.body;
    const userId = (req as any).userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.isArtist) {
      return res.status(403).json({ message: "Only artists can create portfolios" });
    }

    const portfolio = await prisma.portfolio.create({
      data: { title, bio, userId },
    });

    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: "Error creating portfolio", error: err });
  }
});

// Get all portfolios
router.get("/", async (_req, res) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: "Error fetching portfolios", error: err });
  }
});

// Get single portfolio
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: "Error fetching portfolio", error: err });
  }
});

export default router;