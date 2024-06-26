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
  .get("/list/pog/:id", async (req: Request, res: Response) => {
    const pogId = parseInt(req.params.id);
    try {
      const query = "SELECT * FROM pogs WHERE id = $1";
      const { rows } = await pool.query(query, [pogId]);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching pogs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .get("/list/owned", async (req: Request, res: Response) => {
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

      const query = "SELECT owned_pogs FROM users WHERE id = $1";
      const { rows } = await pool.query(query, [userId]);
      const ownedPogs = JSON.parse(rows[0].owned_pogs);
      res.status(200).json(ownedPogs);
    } catch (error) {
      console.error("Error fetching pogs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .get("/list", async (req: Request, res: Response) => {
    try {
      const query = "SELECT * FROM pogs";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching pogs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .get("/balance/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const getBalance = "SELECT funds AS balance from users WHERE id = $1";
      const { rows } = await pool.query(getBalance, [id]);
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
