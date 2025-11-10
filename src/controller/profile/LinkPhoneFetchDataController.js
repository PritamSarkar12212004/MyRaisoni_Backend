import UserModel from "../../models/userData/UserDataModal.js";

const LinkPhoneFetchDataController = async (req, res) => {
  console.log(req.body);
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Please provide a phone number.",
        success: false,
      });
    }

    const data = await UserModel.findOne({ User_phone: phone });

    if (!data) {
      return res.status(404).json({
        message: "This phone number is not linked with any user.",
        success: false,
      });
    }

    res.status(200).json({
      message: "User data fetched successfully.",
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error in LinkPhoneFetchDataController:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};

export default LinkPhoneFetchDataController;
