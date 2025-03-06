const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let events = [];
let eventIdCounter = 1;

// Get all events
app.get("/events", (req, res) => {
    res.json(events);
});

// Get a single event by ID
app.get("/events/:id", (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (event) res.json(event);
    else res.status(404).json({ message: "Event not found" });
});

// Add new event
app.post("/events", (req, res) => {
    const { name, category, date, image } = req.body;
    const newEvent = { id: eventIdCounter++, name, category, date, image };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Update event
app.put("/events/:id", (req, res) => {
    const event = events.find(e => e.id == req.params.id);
    if (event) {
        event.name = req.body.name;
        event.category = req.body.category;
        event.date = req.body.date;
        event.image = req.body.image;
        res.json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

// Delete event
app.delete("/events/:id", (req, res) => {
    events = events.filter(e => e.id != req.params.id);
    res.json({ message: "Event deleted successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
