import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import buyAndSellRouter from "./routes/buyAndSell";
import createAndEditRouter from "./routes/createAndEdit";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import getPogsRouter from "./routes/getPogs";
import decryptTokenRouter from "./routes/decryptToken";

const startServer = async () => {
  const app: Application = express();

  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  };

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors(corsOptions))
    .use("/", getPogsRouter)
    .use("/transact", buyAndSellRouter)
    .use("/manage", createAndEditRouter)
    .use("/login", loginRouter)
    .use("/register", registerRouter);

  app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
  });
};

startServer();
