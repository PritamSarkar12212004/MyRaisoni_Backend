import UserModel from "../../models/userData/UserDataModal.js";

const LinkPhoneFetchDataController = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(404).json({
        message: "Please Provide Phone Number Form Frontend",
      });
    } else {
      const data = await UserModel.find({
        User_phone: phone,
      });
      if (!data) {
        res.staus(404).json({
          message: "Phone Number Not Link With User id and Password",
          data: null,
        });
      } else {
        res.status(200).json({
          message: "Data Fetch Successfully",
          data: data,
        });
      }
    }
  } catch (error) {
    res.sattus(404).json({
      message: "Error From Server Side",
    });
  }
};
export default LinkPhoneFetchDataController;
