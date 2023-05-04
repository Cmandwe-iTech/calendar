const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event"},
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const InviteModel = mongoose.model("Invite", InviteSchema);
module.exports = InviteModel;
