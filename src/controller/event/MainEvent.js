import Event from "../../models/Event.js";

const MainEvent = async (req, res) => {
  try {
    const events = await Event.find({}); // Use 'events' instead of 'res'
    res.status(200).json({
      message: "Success",
      data: events,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

export default MainEvent;
