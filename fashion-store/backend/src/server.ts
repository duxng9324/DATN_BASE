import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import menuRouter from "./router/Menu.route";
import { AppDataSource } from "./AppDataSource/data-source";
import authRoutes from "./router/auth.route";
import roleRouter from "./router/role.route";
import { errorMiddleware } from "./middleware/error.middleware";

const PORT = process.env.PORT || 5000;

app.use("/api/menu", menuRouter);
app.use("/api/auth", authRoutes);
app.use("/api/role",roleRouter);


app.use(errorMiddleware);

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