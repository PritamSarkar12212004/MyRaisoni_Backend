import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  event_name: {
    type: String,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  small_description: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  pdf: {
    type: String,
  },
  video: {
    type: String,
  },
});
const Event = mongoose.model("Event", eventSchema);

export default Event;
