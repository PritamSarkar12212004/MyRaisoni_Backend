import mongoose from "mongoose";

const smallEventSchema = new mongoose.Schema({
  title: {
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
const SmallEvent = mongoose.model("SmallEvent", smallEventSchema);

export default SmallEvent;
