import axios from "axios";

const StudentFeesControler = async (req, res) => {
  const { id, token } = req.body.data;
  const url =
    "https://ghrua.cybervidya.net/api/finance/student/fees/payment/year-wise/fetch";
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
        console.log(error);
        res.status(500).json({
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
export default StudentFeesControler;
