import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router: Router = express.Router();

dotenv.config();
router.get("/", async (req: Request, res: Response) => {});

export default router;
