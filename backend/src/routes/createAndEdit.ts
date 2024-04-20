import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router
  .post("/", (req: Request, res: Response) => {
    // create
  })
  .patch("/", (req: Request, res: Response) => {
    // edit
  })
  .delete("/", (req: Request, res: Response) => {
    // delete
  });

export default router;
