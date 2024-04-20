import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

const router: Router = express.Router();

// Create a new Pog
router.post("/create", async (req: Request, res: Response) => {
  const { name, symbol, price, color } = req.body;
  try {
    const query = `
      INSERT INTO pogs (name, symbol, current_price, previous_price, color)
      VALUES ($1, $2, $3, $3, $4)
      RETURNING *
    `;
    const values = [name, symbol, price, color];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Pog" });
  }
});

// Update an existing Pog
router.patch("/edit/:id", async (req: Request, res: Response) => {
  const pogId = parseInt(req.params.id);
  const { name, symbol, price, color } = req.body;
  try {
    const query = `
      UPDATE pogs
      SET name = $1, symbol = $2, current_price = $3, previous_price = $4, color = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [name, symbol, price, price, color, pogId];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Pog not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update Pog" });
  }
});

// Delete a Pog
router.delete("/delete/:id", async (req: Request, res: Response) => {
  const pogId = parseInt(req.params.id);
  try {
    const query = `
      DELETE FROM pogs
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [pogId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Pog not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Pog" });
  }
});

export default router;
