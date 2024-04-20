import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
    const values = [name, email, hashedPassword];
    const { rows } = await pool.query(query, values);
    const userId = rows[0].id;

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
