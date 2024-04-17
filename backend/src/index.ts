import express from "express";
import bodyParser from "body-parser";

const startServer = async () => {
  const app = express();
  app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
  });
};

startServer();
