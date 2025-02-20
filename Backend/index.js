const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const Event = require("./models/event.models");

initializeDatabase();

const newEvent = new Event({
  title: "Mindfulness & Mental Wellness Seminar",
  date: "2025-08-25",
  type: "Online",
  thumbnail:
    "https://images.pexels.com/photos/4098270/pexels-photo-4098270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  description:
    "A virtual seminar focused on mental wellness, mindfulness, and stress management techniques. Experts in psychology and wellness coaching will guide participants through meditation practices, breathing exercises, and mindset strategies for a healthier life. Ideal for professionals, students, and anyone looking to improve their mental well-being.",
  topic: "Mental Health & Wellness",
  sessionTimings: ["7:00 PM - 9:00 PM"],
  speakers: ["Dr. Emily Watson", "James Cooper"],
  price: 300,
  venue: "Zoom",
  address: "Online",
  dressCode: "Casual",
  ageRestrictions: "16+ only",
  tags: ["Wellness", "Mindfulness", "Mental Health"],
});

async function createEvent(newEvent) {
  try {
    newEvent.date = new Date(newEvent.date);
    const event = new Event(newEvent);
    const savedEvent = await event.save();
    console.log("Event added successfully", savedEvent);
  } catch (error) {
    throw error;
  }
}
// createEvent(newEvent);

app.get("/", async (req, res) => {
  res.send("Hello, Express Server!");
});

// Get all events

async function readAllEvents() {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "Events not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

async function readEventByTitle(title) {
  try {
    const event = await Event.findOne({ title: title });
    return event;
  } catch (error) {
    throw error;
  }
}

app.get("/events/:title", async (req, res) => {
  try {
    const event = await readEventByTitle(req.params.title);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json("Failed to fetch event by title.");
  }
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
