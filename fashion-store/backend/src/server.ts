import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import menuRouter from "./router/Menu.route";
import { AppDataSource } from "./AppDataSource/data-source";

const PORT = process.env.PORT || 5000;

app.use("/menu", menuRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Init error", err);
  });