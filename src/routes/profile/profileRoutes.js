import express from "express";
import asyncHandler from "express-async-handler";
import linkPhoneNumberController from "../../controller/profile/linkPhoneNumberController.js";
const route = express.Router();
route.post("/link-Phone", asyncHandler(linkPhoneNumberController));
export default route;
