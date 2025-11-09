import OtpGenerator from "../../function/Otp/OtpGenerator.js";
import WApi from "../../utils/whatsapp/WApi.js";

const CallOtpController = async (req, res) => {
  const { phone } = req.body;
  console.log(phone);
  console.log(typeof phone);
  if (!phone) {
    res.status(404).json({
      message: "Provide Phone Number",
      data: null,
    });
  }
  try {
    const otp = await OtpGenerator();
    const data = await WApi.post("/api/whatsapp/otp/my_raisoni", {
      number: phone,
      otp: otp,
      type: "Login",
    });
    if (data) {
      res.status(200).json({
        message: "Otp Sent Seccussfull",
        otp: data.data.data.otp,
      });
    } else {
      res.status(404).json({
        message: "Otp Sending Error",
        data: null,
      });
    }
  } catch (error) {
    console.log(error?.message);
    res.status(404).json({
      message: "error form server",
      data: null,
    });
  }
};
export default CallOtpController;
