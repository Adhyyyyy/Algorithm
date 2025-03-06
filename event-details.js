const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

async function fetchEventDetails() {
    const response = await fetch(`http://localhost:5000/events/${eventId}`);
    const event = await response.json();

    document.getElementById("eventName").innerText = event.name;
    document.getElementById("eventCategory").innerText = `Category: ${event.category}`;
    document.getElementById("eventDate").innerText = `Date: ${event.date}`;
    document.getElementById("eventImage").src = event.image;
}

// Register for an event
async function registerForEvent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        document.getElementById("registrationMessage").innerText = "Please fill all fields!";
        return;
    }

    document.getElementById("registrationMessage").innerText = "Registration successful!";
}

// Fetch event details when page loads
document.addEventListener("DOMContentLoaded", fetchEventDetails);
