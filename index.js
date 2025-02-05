import express from "express";
import cors from "cors";
import MainRoutes from "./src/routes/MainRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/", MainRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
