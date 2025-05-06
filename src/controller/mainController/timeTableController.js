const timeTableController = async (req, res) => {
  function getWeekStartAndEnd() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    let startDate, endDate;

    if (dayOfWeek === 0) {
      // If today is Sunday, start from Monday
      startDate = new Date(today);
      startDate.setDate(today.getDate() + 1);
    } else if (dayOfWeek === 6) {
      // If today is Saturday, start from next Monday
      startDate = new Date(today);
      startDate.setDate(today.getDate() + 2);
    } else {
      // Otherwise, find Monday of the current week
      startDate = new Date(today);
      startDate.setDate(today.getDate() - (dayOfWeek - 1));
    }

    // Find Friday of the same week
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);

    return {
      weekStart: startDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
      weekEnd: endDate.toISOString().split("T")[0],
    };
  }
  function getWeekDetails() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    let startDate, endDate;

    if (dayOfWeek === 0) {
      // If today is Sunday, start from Monday
      startDate = new Date(today);
      startDate.setDate(today.getDate() + 1);
    } else if (dayOfWeek === 6) {
      // If today is Saturday, start from next Monday
      startDate = new Date(today);
      startDate.setDate(today.getDate() + 2);
    } else {
      // Otherwise, find Monday of the current week
      startDate = new Date(today);
      startDate.setDate(today.getDate() - (dayOfWeek - 1));
    }

    // Find Friday of the same week
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);

    // Generate Monday to Friday dates with first letter of the day
    const weekdays = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"]; // First letters of days

    for (let i = 0; i < 5; i++) {
      let currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekdays.push({
        date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        day: dayNames[currentDate.getDay()], // First letter of the day
      });
    }

    return {
      weekStart: startDate.toISOString().split("T")[0],
      weekEnd: endDate.toISOString().split("T")[0],
      weekdays,
    };
  }
  const weekDetails = getWeekDetails();
  const { id, token } = req.body.data;
  const url = `https://ghrua.cybervidya.net/api/student/schedule/class?weekEndDate=${
    getWeekStartAndEnd().weekEnd
  }&weekStartDate=${getWeekStartAndEnd().weekStart}`;
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
      console.log(data)
      res.status(200).json({
        data: {
          data: data,
          weekDetails: weekDetails,
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
export default timeTableController;
