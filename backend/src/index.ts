import express, { Application } from "express";
import bodyParser from "body-parser";

import buyAndSellRouter from "./routes/buyAndSell";
import createAndEditRouter from "./routes/createAndEdit";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";

const startServer = async () => {
  const app: Application = express();

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use("/transact", buyAndSellRouter)
    .use("/manage", createAndEditRouter)
    .use("/login", loginRouter)
    .use("/register", registerRouter);

  app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
  });
};

startServer();
