import axios from "axios";

const FainanceDownloadController = async (req, res) => {
  const { token } = req.body.data;

  axios
    .get(
      "https://ghrua.cybervidya.net/api/finance/student/fees/student-payment-history/get/3",
      {
        headers: {
          Authorization: `GlobalEducation ${token}`,
        },
      }
    )
    .then((response) => {
      res.status(200).json({
        data: response.data.data,
        status: 200,
        message: "Success",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        data: null,
        status: 500,
        message: "Failed",
      });
    });
};
export default FainanceDownloadController;
