import express from "express";
import async_handler from "express-async-handler";
import MainEvent from "../controller/event/MainEvent.js";
import SemiEventController from "../controller/event/SemiEventController.js";
import SmallEventCotroller from "../controller/event/SmallEventCotroller.js";
const router = express.Router();

router.post("/main", async_handler(MainEvent));
router.post("/semi", async_handler(SemiEventController));
router.post("/small", async_handler(SmallEventCotroller));
export default router;
