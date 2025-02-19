import mongoose from "mongoose";

const semiEventSchema = new mongoose.Schema({
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
const SemiEvent = mongoose.model("SemiEvent", semiEventSchema);

export default SemiEvent;
