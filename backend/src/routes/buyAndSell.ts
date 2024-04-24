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

interface Pog {
  id: number;
  name: string;
  symbol: string;
  quantity: string;
  current_price: string;
}

dotenv.config();

router
  .post("/buy/:id/:quantity", async (req: Request, res: Response) => {
    const pogId: number = parseInt(req.params.id);
    const quantity: number = parseInt(req.params.quantity);
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

      const getPriceQuery =
        "SELECT name, symbol, current_price FROM pogs WHERE id = $1";
      const price = await pool.query(getPriceQuery, [pogId]);
      const currentPrice = parseFloat(price.rows[0].current_price) * quantity;
      const updateBalanceQuery =
        "UPDATE Users SET funds = funds - $1 WHERE id = $2";
      await pool.query(updateBalanceQuery, [currentPrice, userId]);
      const getOwnedPogs = "SELECT owned_pogs FROM users WHERE id = $1";
      const pogsJson = await pool.query(getOwnedPogs, [userId]);
      const ownedPogs = JSON.parse(pogsJson.rows[0].owned_pogs);
      const existingPogs = ownedPogs.find((obj: Pog) => obj.id === pogId);
      if (existingPogs) {
        existingPogs.quantity += quantity;
      } else {
        ownedPogs.push({
          id: pogId,
          name: price.rows[0].name,
          symbol: price.rows[0].symbol,
          current_price: price.rows[0].current_price,
          quantity: quantity,
        });
      }
      const newPogsList = JSON.stringify(ownedPogs);
      const newPogsQuery = "UPDATE Users SET owned_pogs = $1 WHERE id = $2";
      const variables: string[] = [newPogsList, String(userId)];
      const updatedUserPogs = await pool.query(newPogsQuery, variables);
      res.status(201).json({ message: "Pog bought successfully" });
    } catch (err) {
      console.error("Error buying Pog:", err);
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  })
  .post("/sell/:id/:quantity", async (req: Request, res: Response) => {
    const pogId: number = parseInt(req.params.id);
    const quantity: number = parseInt(req.params.quantity);
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

      const getPriceQuery =
        "SELECT name, symbol, current_price FROM pogs WHERE id = $1";
      const price = await pool.query(getPriceQuery, [pogId]);
      const currentPrice = parseFloat(price.rows[0].current_price) * quantity;
      const updateBalanceQuery =
        "UPDATE Users SET funds = funds - $1 WHERE id = $2";
      await pool.query(updateBalanceQuery, [currentPrice, userId]);

      const getOwnedPogs = "SELECT owned_pogs FROM users WHERE id = $1";
      const pogsJson = await pool.query(getOwnedPogs, [userId]);
      const ownedPogs = JSON.parse(pogsJson.rows[0].owned_pogs);

      const existingPogs = ownedPogs.find((obj: Pog) => obj.id === pogId);
      if (existingPogs) {
        existingPogs.quantity -= quantity;
        if (existingPogs.quantity == 0) {
          const deletedPog = ownedPogs.findIndex(
            (obj: Pog) => obj.id === pogId
          );
          if (deletedPog) {
            ownedPogs.pop(deletedPog);
          } else {
            throw new Error("Pog can't be found!");
          }
        } else if (existingPogs.quantity < 0) {
          throw new Error("Quantity is less than 0!");
        }
      } else {
        throw new Error("Pog not found!");
      }

      const newPogsList = JSON.stringify(ownedPogs);
      const newPogsQuery = "UPDATE Users SET owned_pogs = $1 WHERE id = $2";
      const variables: string[] = [newPogsList, String(userId)];
      await pool.query(newPogsQuery, variables);

      res.status(201).json({ message: "Pog sold successfully" });
    } catch (error) {
      console.error("Error selling Pog:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
