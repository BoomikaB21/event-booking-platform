import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;

  const event = await Event.create({ title, description, date });
  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.title = req.body.title || event.title;
  event.description = req.body.description || event.description;
  event.date = req.body.date || event.date;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await Event.deleteOne({ _id: event._id });
  res.json({ message: "Event deleted successfully" });
});


