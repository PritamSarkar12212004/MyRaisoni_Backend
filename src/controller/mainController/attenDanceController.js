const attendanceController = async (req, res) => {
  const { id, token } = req.body.data;
  const url =
    "https://ghrua.cybervidya.net/api/attendance/course/component/student";
  const headers = {
    accept: "application/json, text/plain, */*",
    authorization: `GlobalEducation ${token}`,
    uid: toString(id),
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      const {
        degreeName,
        semesterName,
        academicSessionName,
        degreeBranchSemesterName,
      } = data.data;
      const commenDetiles = {
        degreeName,
        semesterName,
        academicSessionName,
        degreeBranchSemesterName,
      };
      const { attendanceCourseComponentInfoList } = data.data;
      const attendanceData = attendanceCourseComponentInfoList;
      res.status(200).json({
        data: {
          commenDetiles,
          attendanceData,
        },
        status: 200,
        message: "Success",
      });
    } else {
      res.status(500).json({
        data: null,
        status: 500,
        message: "Failed",
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
export default attendanceController;
