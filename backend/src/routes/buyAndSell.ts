import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router
  .post("/buy/:id", (req: Request, res: Response) => {
    // for buying pogs
  })
  .post("/sell/:id", (req: Request, res: Response) => {
    // for selling pogs
  });

export default router;
