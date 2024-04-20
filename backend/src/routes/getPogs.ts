import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router
  .get("/list", async (req: Request, res: Response) => {
    try {
      const query = "SELECT * FROM pogs";
      const { rows } = await pool.query(query);
      res.json(rows);
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
