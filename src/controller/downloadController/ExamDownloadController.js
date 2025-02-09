import axios from "axios";

const ExamDownloadController = async (req, res) => {
  const { token } = req.body.data;

  axios
    .get(
      "https://ghrua.cybervidya.net/api/course/report/reg/GHRUA23011140629",
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
export default ExamDownloadController;
