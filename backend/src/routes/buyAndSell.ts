import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router: Router = express.Router();

interface DecodedToken {
  userId: number;
  name: string;
  type: string;
}

dotenv.config();

router
  .post("/buy/:id", async (req: Request, res: Response) => {
    const pogId: number = parseInt(req.params.id);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as DecodedToken;
      const userId = decoded.userId;

      const getPriceQuery = "SELECT current_price FROM pogs WHERE id = $1";
      const { rows } = await pool.query(getPriceQuery, [pogId]);
      const currentPrice = rows[0].current_price;
      const updateBalanceQuery =
        "UPDATE Users SET funds = funds - $1 WHERE id = $2";
      await pool.query(updateBalanceQuery, [currentPrice, userId]);
      const updateOwnerQuery = "UPDATE pogs SET owner = $1 WHERE id = $2";

      await pool.query(updateOwnerQuery, [userId, pogId]);
      res.json({ message: "Pog bought successfully" });
    } catch (err) {
      console.error("Error buying Pog:", err);
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post("/sell/:id", async (req: Request, res: Response) => {
    const pogId: number = parseInt(req.params.id);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as DecodedToken;
      const userId = decoded.userId;

      const getPriceQuery = "SELECT current_price FROM pogs WHERE id = $1";
      const { rows } = await pool.query(getPriceQuery, [pogId]);
      const currentPrice = rows[0].current_price;

      const updateBalanceQuery =
        "UPDATE Users SET funds = funds + $1 WHERE id = $2";
      await pool.query(updateBalanceQuery, [currentPrice, userId]);

      const updatePriceAndOwnerQuery =
        "UPDATE pogs SET owner = NULL WHERE id = $1";
      await pool.query(updatePriceAndOwnerQuery, [pogId]);

      res.json({ message: "Pog sold successfully" });
    } catch (error) {
      console.error("Error selling Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
