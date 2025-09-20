import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined in .env");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // Attach user ID to request for downstream controllers
    (req as any).userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid" });
  }
};