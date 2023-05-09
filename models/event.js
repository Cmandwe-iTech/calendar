const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: { type: String, required: true },
  color:{type:String, required:true},
  createdBy: {type: String,ref: "User", required: true },
});

const EventModel = mongoose.model("Event", EventSchema);
module.exports = EventModel;