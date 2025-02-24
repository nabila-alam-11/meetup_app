const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
    },
    sessionTimings: [
      {
        type: String,
      },
    ],
    hostedBy: {
      type: String,
    },
    speakers: [
      {
        name: { type: String, required: true },
        image: { type: String },
        occupation: { type: String },
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    venue: {
      type: String,
    },
    address: {
      type: String,
    },
    dressCode: {
      type: String,
    },
    ageRestrictions: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
