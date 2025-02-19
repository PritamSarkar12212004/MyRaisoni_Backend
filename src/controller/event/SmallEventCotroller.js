import SmallEvent from "../../models/SmallEvent.js";

const SmallEventCotroller = async (req, res) => {
  try {
    const events = await SmallEvent.find({}); // Use 'events' instead of 'res'
    console.log(events);
    res.status(200).json({
      message: "Success",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default SmallEventCotroller;
