import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router
  .post("/buy/:id", async (req: Request, res: Response) => {
    const pogId = req.params.id;

    try {
      const updatePriceQuery =
        "UPDATE pogs SET current_price = current_price + 1 WHERE id = $1";
      await pool.query(updatePriceQuery, [pogId]);

      res.json({ message: "Pog bought successfully" });
    } catch (error) {
      console.error("Error buying Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post("/sell/:id", async (req: Request, res: Response) => {
    const pogId = req.params.id;

    try {
      const updatePriceQuery =
        "UPDATE pogs SET current_price = current_price - 1 WHERE id = $1";
      await pool.query(updatePriceQuery, [pogId]);

      res.json({ message: "Pog sold successfully" });
    } catch (error) {
      console.error("Error selling Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
