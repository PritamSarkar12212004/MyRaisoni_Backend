import axios from "axios";

const FainanceFainalownlaod = async (req, res) => {
  const { token, voucherNo } = req.body;
  const variifyStreing = voucherNo.substring(0, 3);
  try {
    const response = await axios.post(
      "https://ghrua.cybervidya.net/api/report/receipt/download",
      {
        voucherNo: voucherNo,
        feeReceiptFormat: "ONE_COPY_FORMAT",
        reportId: variifyStreing === "SRC" ? 231 : 236,
      },
      {
        headers: {
          Authorization: `GlobalEducation ${token}`,
        },
        responseType: "arraybuffer", // Ensures binary data is received
      }
    );
    const base64Pdf = Buffer.from(response.data).toString("base64");
    res.status(200).json({
      data: base64Pdf,
      message: "PDF downloaded successfully",
    });
    ("base64");
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};
export default FainanceFainalownlaod;
