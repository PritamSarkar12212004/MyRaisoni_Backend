import axios from "axios";

const ExamFainalDownload = async (req, res) => {
  const { token, semesterId, sessionId } = req.body;
  try {
    const response = await axios.get(
      `https://ghrua.cybervidya.net/api/reports/student/grade-card/${semesterId}/${sessionId}/Regular`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: `GlobalEducation ${token}`,
        },
        responseType: "arraybuffer", // Ensures binary data is received
      }
    );

    const base64Pdf = Buffer.from(response.data).toString("base64");

    // Save to file (optional)

    // Send base64 data to frontend
    res.status(200).json({
      data: base64Pdf,
      message: "PDF downloaded successfully",
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

export default ExamFainalDownload;
