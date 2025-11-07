const FainanceDownloadController = async (req, res) => {
  const { token } = req.body.data;
  const url = `https://ghrua.cybervidya.net/api/finance/student/fees/student-payment-history/get/3`;

  const url2 = `https://ghrua.cybervidya.net/api/finance/student/fees/student-payment-history/get/4`;
  const url3 = `https://ghrua.cybervidya.net/api/finance/student/fees/student-payment-history/get/5`;

  const header = {
    accept: "application/json, text/plain, */*",
    authorization: `GlobalEducation ${token}`,
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });
    const response2 = await fetch(url2, {
      method: "GET",
      headers: header,
    });
    const response3 = await fetch(url3, {
      method: "GET",
      headers: header,
    });
    if (response.ok && response2.ok) {
      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      res.status(200).json({
        data: {
          data: data ? data : null,
          data2: data2 ? data2 : null,
          data3: data3 ? data3 : null,
        },
        status: 200,
        message: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      message: "Failed",
    });
  }
};
export default FainanceDownloadController;
