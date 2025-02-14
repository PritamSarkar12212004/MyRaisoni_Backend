import express from "express";
import asynchandler from "express-async-handler";
import MaintananController from "../controller/helper/MaintananController.js";
const router = express.Router();
router.post("/maintanence", asynchandler(MaintananController));
export default router;
