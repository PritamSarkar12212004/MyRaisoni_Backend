import express from "express";
import asyncehandler from "express-async-handler";
import FainanceDownloadController from "../controller/downloadController/FainanceDownloadController.js";
import ExamDownloadController from "../controller/downloadController/ExamDownloadController.js";
const router = express.Router();
router.post("/fainanceOne", asyncehandler(FainanceDownloadController));
router.post("/examOne", asyncehandler(ExamDownloadController));
export default router;
