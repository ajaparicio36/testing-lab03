import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router
  .post("/buy/:id", async (req: Request, res: Response) => {
    const pogId = req.params.id;

    try {
      // Begin a transaction
      await pool.query("BEGIN");

      // Update the current_price column for the given Pog ID
      const updatePriceQuery =
        "UPDATE pogs SET current_price = current_price + 1 WHERE id = $1";
      await pool.query(updatePriceQuery, [pogId]);

      // Commit the transaction
      await pool.query("COMMIT");

      res.json({ message: "Pog bought successfully" });
    } catch (error) {
      // Rollback the transaction on error
      await pool.query("ROLLBACK");
      console.error("Error buying Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post("/sell/:id", async (req: Request, res: Response) => {
    const pogId = req.params.id;

    try {
      // Begin a transaction
      await pool.query("BEGIN");

      // Update the current_price column for the given Pog ID
      const updatePriceQuery =
        "UPDATE pogs SET current_price = current_price - 1 WHERE id = $1";
      await pool.query(updatePriceQuery, [pogId]);

      // Commit the transaction
      await pool.query("COMMIT");

      res.json({ message: "Pog sold successfully" });
    } catch (error) {
      // Rollback the transaction on error
      await pool.query("ROLLBACK");
      console.error("Error selling Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
