import express, { Router, Request, Response } from "express";
import { pool } from "../utils/pool";

import { verifyAdmin } from "../middlewares/verifyAdmin";

const router: Router = express.Router();

router
  .post("/create", verifyAdmin, async (req: Request, res: Response) => {
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
      console.log(error);
      res.status(500).json({ error: "Failed to create Pog" });
    }
  })
  .patch("/edit/:id", verifyAdmin, async (req: Request, res: Response) => {
    const pogId = req.params.id;
    const { name, symbol, color } = req.body;
    try {
      const query = `
      UPDATE pogs
      SET name = $1, symbol = $2, color = $3
      WHERE id = $4
      RETURNING *
    `;
      const values = [name, symbol, color, pogId];
      const result = await pool.query(query, values);
      if (result.rowCount === 0) {
        res.status(404).json({ error: "Pog not found" });
      } else {
        res.status(201).json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update Pog" });
    }
  })
  .delete("/delete/:id", verifyAdmin, async (req: Request, res: Response) => {
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
        res.status(202).json(result.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Pog" });
    }
  })
  .get("/fluctuate/:id", verifyAdmin, async (req: Request, res: Response) => {
    const pogId = parseInt(req.params.id);
    try {
      const getPriceQuery = `SELECT * FROM Pogs WHERE id = $1`;
      const { rows } = await pool.query(getPriceQuery, [pogId]);
      const currentPrice = rows[0].current_price;
      console.log(currentPrice);

      const getRandomFloat = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const randomFloat = getRandomFloat(-5, 5);
      const newPrice: number = parseFloat(
        (currentPrice - currentPrice * (randomFloat / 100)).toFixed(2)
      );
      const updatePriceAndPercentage = `UPDATE Pogs
        SET current_price = $1, percent_drop = $2
        WHERE id = $3`;
      await pool.query(updatePriceAndPercentage, [
        newPrice,
        randomFloat * -1,
        pogId,
      ]);
      res.status(200).json({ message: "Fluctuated pog! " });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to change price" });
    }
  })
  .get("/fluctuate/", verifyAdmin, async (req: Request, res: Response) => {
    try {
      const getPriceQuery = `SELECT * FROM Pogs`;
      const { rows } = await pool.query(getPriceQuery);
      rows.map(async (row) => {
        const currentPrice = row.current_price;

        const getRandomFloat = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };

        const randomFloat = getRandomFloat(-5, 5);
        const newPrice: number = parseFloat(
          (currentPrice - currentPrice * (randomFloat / 100)).toFixed(2)
        );
        const updatePriceAndPercentage = `UPDATE Pogs
        SET current_price = $1, percent_drop = $2
        WHERE id = $3`;
        await pool.query(updatePriceAndPercentage, [
          newPrice,
          randomFloat,
          row.id,
        ]);
        res.status(200).json({ message: "Fluctuated all pogs! " });
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to change price" });
    }
  });

export default router;
