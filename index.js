import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
import cors from "cors";
import connectDB from "./src/database/MongoDataBase.js";
import MainRoutes from "./src/routes/MainRoutes.js";
import DownloadRoute from "./src/routes/DownloadRoute.js";
import helperRoutes from "./src/routes/helperRoutes.js";
import resetRouter from "./src/routes/resetRouter.js";
import Event from "./src/routes/Event.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/", MainRoutes);
app.use("/download", DownloadRoute);
app.use("/helper", helperRoutes);
app.use("/reset", resetRouter);
app.use("/event", Event);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
