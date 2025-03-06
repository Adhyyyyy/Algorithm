const eventList = document.getElementById("eventList");
const categoryFilter = document.getElementById("categoryFilter");

async function fetchEvents() {
    const response = await fetch("http://localhost:5000/events");
    const events = await response.json();
    displayEvents(events);
}

// Display Events with Filtering
function displayEvents(events) {
    eventList.innerHTML = "";
    const selectedCategory = categoryFilter.value;

    events.forEach(event => {
        if (selectedCategory === "All" || event.category === selectedCategory) {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.name}" class="event-img">
                <div class="event-info">
                    <h3>${event.name}</h3>
                    <p>📅 ${event.date}</p>
                    <p>🏷️ ${event.category}</p>
                    <button onclick="location.href='event-details.html?id=${event.id}'">View Details</button>
                </div>
            `;

            eventList.appendChild(eventCard);
        }
    });
}

// Handle category change
categoryFilter.addEventListener("change", fetchEvents);

// Load events on page load
document.addEventListener("DOMContentLoaded", fetchEvents);
