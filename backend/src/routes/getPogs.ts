import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    // Query to fetch all rows from the pogs table
    const query = "SELECT * FROM pogs";
    const { rows } = await pool.query(query);

    // Send the fetched data as the response
    res.json(rows);
  } catch (error) {
    console.error("Error fetching pogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
