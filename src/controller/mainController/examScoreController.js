import axios from "axios";

const examScoreController = async (req, res) => {
  const { token } = req.body.data;
  const url = "https://ghrua.cybervidya.net/api/exam/score/get/score";
  const headers = {
    accept: "application/json, text/plain, */*",
    authorization: `GlobalEducation ${token}`,
  };
  try {
    axios
      .get(url, { headers })
      .then((response) => {
        res.status(200).json({
          data: response.data.data,
          status: 200,
          message: "Success",
        });
      })
      .catch((error) => {
        res.status(400).json({
          data: null,
          status: 500,
          message: "Failed",
        });
      });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: "Failed",
    });
  }
};
export default examScoreController;
