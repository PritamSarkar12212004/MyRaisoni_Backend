import express from "express";
import asyncHandler from "express-async-handler";
import linkPhoneNumberController from "../../controller/profile/linkPhoneNumberController.js";
import LinkPhoneFetchDataController from "../../controller/profile/LinkPhoneFetchDataController.js";
const route = express.Router();
route.post("/link-Phone", asyncHandler(linkPhoneNumberController));
route.post(
  "/link-Phone-fetch_data",
  asyncHandler(LinkPhoneFetchDataController)
);
export default route;
