import axios from "axios";

const userPasswordController = async (req, res) => {
  const { email } = req.body;
  axios
    .post("https://ghrua.cybervidya.net/api/auth/password-reset-link", {
      email: email,
    })
    .then((response) => {
      res.status(200).json({
        success: true,
        message: response.data.data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.response.data.error.reason,
      });
    });
};
export default userPasswordController;
