import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "gwapo", {
      expiresIn: "4h", // Token expiration time (e.g., 1 hour)
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
