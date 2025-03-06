document.addEventListener("DOMContentLoaded", fetchClubs);

const clubsList = document.getElementById("clubsList");
const registrationForm = document.getElementById("registrationForm");
const clubRegistrationForm = document.getElementById("clubRegistrationForm");

const clubs = [
    { name: "Coding Club", image: "https://cdn.pixabay.com/photo/2024/06/14/12/15/developer-8829711_1280.jpg" },
    { name: "Music Club", image: "https://cdn.pixabay.com/photo/2019/11/02/01/15/headphones-4595492_1280.jpg" },
    { name: "Sports Club", image: "https://cdn.pixabay.com/photo/2014/10/14/20/24/soccer-488700_1280.jpg" },
    { name: "Drama Club", image: "https://cdn.pixabay.com/photo/2016/11/08/05/40/actor-1807557_1280.jpg" }
];

function fetchClubs() {
    clubsList.innerHTML = "";
    clubs.forEach(club => {
        const clubCard = document.createElement("div");
        clubCard.classList.add("club-card");
        clubCard.innerHTML = `
            <img src="${club.image}" alt="${club.name}">
            <h3>${club.name}</h3>
            <button onclick="registerForClub('${club.name}')">Request to Join</button>
        `;
        clubsList.appendChild(clubCard);
    });
}

function registerForClub(clubName) {
    registrationForm.style.display = "block";
    document.getElementById("clubName").value = clubName;
}

clubRegistrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const userData = {
        club: document.getElementById("clubName").value,
        name: document.getElementById("userName").value,
        email: document.getElementById("userEmail").value,
        semester: document.getElementById("userSemester").value,
        branch: document.getElementById("userBranch").value
    };
    console.log("User Data:", userData);
    alert(`You have successfully requested to join ${userData.club}`);
    clubRegistrationForm.reset();
    registrationForm.style.display = "none";
});
