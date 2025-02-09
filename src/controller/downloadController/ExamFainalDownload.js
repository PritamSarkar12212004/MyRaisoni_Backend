import axios from "axios";

const ExamFainalDownload = async (req, res) => {
  const { semesterId, sessionId, token } = req.body.data;

  try {
    // Fetch PDF from external API
    const response = await axios.get(
      `https://ghrua.cybervidya.net/api/reports/student/grade-card/${semesterId}/${sessionId}/Regular`,
      {
        headers: {
          Authorization: `GlobalEducation ${token}`,
        },
        responseType: "stream", // Stream the response directly
      }
    );

    // Set headers for direct download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="grade-card.pdf"'
    );

    // Pipe the response directly to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ error: "Error downloading the file" });
  }
};

export default ExamFainalDownload;
