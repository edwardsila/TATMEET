import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import bookingRoutes from "./routes/booking.routes";
import notificationRoutes from "./routes/notification.routes";

dotenv.config();

const app = express();

// Middleware

app.use("/api/users", userRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Tatmeet Backend API is running 🚀");
});

export = app;