import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/pool";

const router: Router = express.Router();

router
  .post("/", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const result = await pool.query(query, values);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user.id, name: user.name, type: user.type },
        "gwapo",
        {
          expiresIn: "4h",
        }
      );

      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
  .post("/decrypt", async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

      res.status(200).json(decoded);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
