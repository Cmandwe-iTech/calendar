const express = require("express");
const InviteModel = require("../models/invite");
const UserModel = require("../models/user");
const invite_route = express.Router();

invite_route.get("/invites", async (req, res) => {
  try {
    const invites = await InviteModel.find()
      .populate("event", "title")
      .populate("recipient", "name email");
    res.json(invites);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

invite_route.post("/invites", async (req, res) => {
  try {
    const { eventId, recipientEmail } = req.body;
    const recipient = await UserModel.findOne({ email: recipientEmail });
    const invite = await InviteModel.create({
      event: eventId,
      sender: req.user,
      recipient: recipient,
    });
    res.json(invite);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

invite_route.put("/invites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const invite = await InviteModel.updateOne(id,{status}, {new:true});
    res.json(invite);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});
invite_route.delete("/invites/:id", async (req, res) => {
    try {
      const invite = await InviteModel.deleteOne(
        { _id: req.params.id },
        req.body
      );
      res.json({
        status:"deleted successfully"
      }); 
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = invite_route;
