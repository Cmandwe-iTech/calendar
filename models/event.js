const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  description: { type: String, required: true },
  createdBy: {type: String,ref: "User", required: true },
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = EventModel;