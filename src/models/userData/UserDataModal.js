import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  User_Id: {
    type: String,
    required: true,
  },
  User_Passowrd: {
    type: String,
    required: true,
  },
  User_phone: {
    type: Number,
    required: true,
  },
});
const UserModel = mongoose.model("UserLinkSchema", UserSchema);

export default UserModel;
