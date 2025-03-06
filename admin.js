document.addEventListener("DOMContentLoaded", fetchEvents);

const eventForm = document.getElementById("eventForm");
const eventIdInput = document.getElementById("eventId");
const eventNameInput = document.getElementById("eventName");
const eventCategoryInput = document.getElementById("eventCategory");
const eventDateInput = document.getElementById("eventDate");
const eventImageInput = document.getElementById("eventImage");
const addEventButton = document.getElementById("addEventButton");
const updateEventButton = document.getElementById("updateEventButton");
const eventList = document.getElementById("eventList");

async function fetchEvents() {
    const response = await fetch("http://localhost:5000/events");
    const events = await response.json();
    displayEvents(events);
}

function displayEvents(events) {
    eventList.innerHTML = "";
    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.name}" class="event-img">
            <div class="event-info">
                <h3>${event.name}</h3>
                <p>📅 ${event.date}</p>
                <p>🏷️ ${event.category}</p>
                <button onclick="editEvent(${event.id})">Edit</button>
                <button onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        `;
        eventList.appendChild(eventCard);
    });
}

async function addEvent(event) {
    event.preventDefault();
    const newEvent = {
        name: eventNameInput.value,
        category: eventCategoryInput.value,
        date: eventDateInput.value,
        image: eventImageInput.value
    };
    await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
    });
    fetchEvents();
    eventForm.reset();
}

eventForm.addEventListener("submit", addEvent);

async function deleteEvent(id) {
    await fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" });
    fetchEvents();
}

function editEvent(id) {
    fetch(`http://localhost:5000/events/${id}`)
        .then(response => response.json())
        .then(event => {
            eventIdInput.value = event.id;
            eventNameInput.value = event.name;
            eventCategoryInput.value = event.category;
            eventDateInput.value = event.date;
            eventImageInput.value = event.image;
            addEventButton.style.display = "none";
            updateEventButton.style.display = "block";
        });
}

updateEventButton.addEventListener("click", async function () {
    const updatedEvent = {
        name: eventNameInput.value,
        category: eventCategoryInput.value,
        date: eventDateInput.value,
        image: eventImageInput.value
    };
    await fetch(`http://localhost:5000/events/${eventIdInput.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent)
    });
    fetchEvents();
    eventForm.reset();
    addEventButton.style.display = "block";
    updateEventButton.style.display = "none";
});