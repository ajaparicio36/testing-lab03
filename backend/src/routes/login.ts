import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  // for login and token requests
});

export default router;
