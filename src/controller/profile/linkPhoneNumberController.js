import UserModel from "../../models/userData/UserDataModal.js";

const linkPhoneNumberController = async (req, res) => {
  try {
    const { phone, password, userName } = req.body;
    if ((!phone || !password, !userName)) {
      res.status(404).jason({
        message: "Provide Full information for Frontend",
        data: null,
      });
    } else {
      const data = await UserModel.create({
        User_phone: phone,
        User_Passowrd: password,
        User_Id: userName,
      });
      if (data) {
        res.status(200).json({
          message: "Link SuccessFull",
          data: true,
        });
      } else {
        res.status(404).json({
          message: "error form database",
          data: null,
        });
      }
    }
  } catch (error) {
    {
    }
  }
};
export default linkPhoneNumberController;
