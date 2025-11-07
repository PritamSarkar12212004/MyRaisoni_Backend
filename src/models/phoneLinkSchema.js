import mongoose from "mongoose";
const phoneLink = mongoose.Schema({
  User_phone: {
    type: Number,
  },
  User_Password: {
    type: String,
  },
  User_Name: {
    type: String,
  },
});
const PhoneLinkSchema = mongoose.model("phoneLink", phoneLink);
export default PhoneLinkSchema;
