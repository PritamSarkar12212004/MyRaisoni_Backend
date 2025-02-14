import express from "express";
import asynchandler from "express-async-handler";
import userPasswordController from "../controller/reset/userPasswordController.js";
const router = express.Router();
router.post("/user/password", asynchandler(userPasswordController));
export default router;
