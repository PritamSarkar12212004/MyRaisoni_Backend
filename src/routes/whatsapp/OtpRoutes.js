import express from "express";
import async_handler from "express-async-handler";
import CallOtpController from "../../controller/whatsapp/CallOtpController.js";
const route = express.Router();
route.post("/myRaisoni", async_handler(CallOtpController));
export default route;
