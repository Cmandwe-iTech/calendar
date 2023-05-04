const express = require("express");
const EventModel = require("../models/event");
const event_route = express.Router();

event_route.get("/events", async (req, res) => {
  try {
    const events = await EventModel.find({createdBy: req.user});
    res.json(events);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

event_route.post("/events", async (req, res) => {
  try {
    const event = await EventModel.create({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
      createdBy: req.user,
    });
    res.json(event);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

event_route.put("/events/:id", async (req, res) => {
  try {
    const update = await EventModel.updateOne({ _id: req.params.id }, req.body);
    res.json({
      status: "success",
      update,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

event_route.delete("/events/:id", async (req, res) => {
  try {
    const deleted = await EventModel.deleteOne({ _id: req.params.id });
    res.json({
      status:"successfully deleted",
      deleted
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = event_route;