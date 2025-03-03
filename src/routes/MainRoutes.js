import express from "express";
import async_handler from "express-async-handler";
import mainController from "../controller/mainController/mainController.js";
import attendanceController from "../controller/mainController/attenDanceController.js";
import timeTableController from "../controller/mainController/timeTableController.js";
import StudentFeesControler from "../controller/mainController/StudentFeesControler.js";
import examScoreController from "../controller/mainController/examScoreController.js";
const router = express.Router();
router.post("/main", async_handler(mainController));
router.post("/attendance", async_handler(attendanceController));
router.post("/timetable", async_handler(timeTableController));
router.post("/fees", async_handler(StudentFeesControler));
router.post("/examScore", async_handler(examScoreController));
export default router;
