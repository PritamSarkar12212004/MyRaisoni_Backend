import express from "express";
import asyncehandler from "express-async-handler";
import FainanceDownloadController from "../controller/downloadController/FainanceDownloadController.js";
import ExamDownloadController from "../controller/downloadController/ExamDownloadController.js";
import ExamFainalDownload from "../controller/downloadController/ExamFainalDownload.js";
import FainanceFainalownlaod from "../controller/downloadController/FainanceFainalownlaod.js";
const router = express.Router();
router.post("/fainanceOne", asyncehandler(FainanceDownloadController));
router.post("/examOne", asyncehandler(ExamDownloadController));
router.post("/exam/maindownload", asyncehandler(ExamFainalDownload));
router.post("/fainace/maindownload", asyncehandler(FainanceFainalownlaod));

export default router;
